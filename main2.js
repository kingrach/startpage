// GetStarted - A simple responsive Startpage
// Author: MrAlpha786 (github.con/MrAlpha786)

// Username
// Get the current hour
var currentHour = new Date().getHours();
    
// Function to determine the greeting based on the hour
function greeting(hour) {
  var greetingText;
  if (hour >= 5 && hour <= 11) {
    greetingText = "Good morning, Rachel";
  } else if (hour >= 12 && hour <= 16) {
    greetingText = "Good afternoon, Rachel";
  } else if ((hour >= 17 && hour <= 23) || (hour >= 0 && hour <= 4)) {
    greetingText = "Good evening, Rachel";
  } else {
    greetingText = "Hello, Rachel";
  }
  return greetingText;
}

// Set the greeting text in the HTML element with id "username"
document.getElementById("username").innerHTML = greeting(currentHour);

function showDateAndWeather() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date();
    var day = today.getDate();
    var suffix = getOrdinalSuffix(day);
    var month = today.toLocaleString('default', { month: 'long' });
    var year = today.getFullYear();
    var time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');

    function getOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    function getWeather() {
      // Get location for weather
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Extracting latitude and longitude from the position object
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          console.log("Latitude: " + lat);
          console.log("Longitude: " + lon);
  
          var openApi = "518139f7a0c9b125beed32a90e71ad39";
          var questApi = "IQxNMf2e4DY2gxDTRWV6A0dmfFTB2vKK";
          const questUrl = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${questApi}&location=${lat},${lon}&outFormat=json`;
          const openUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openApi}`;

fetch(questUrl)
  .then(response => response.json())
  .then(data => {
    const city = data.results[0].locations[0].adminArea5;
    const country = data.results[0].locations[0].adminArea1;
    return fetch(openUrl)
      .then(response => response.json())
      .then(weatherData => ({ city, country, weatherData }))
  })
  .then(({ city, country, weatherData }) => {
    const temp = weatherData.main.temp;
    const condStr = weatherData.weather[0].description;
    const condArr = condStr.split(" ");
    for (var i = 0; i < condArr.length; i++) {
      condArr[i] = condArr[i].charAt(0).toUpperCase() + condArr[i].slice(1);
    }
    const cond = condArr.join(" ");
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const time = today.toLocaleTimeString('en-US', { timeStyle: 'short' });
    const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";

    document.getElementById("weather").innerHTML = "It is <span class='flair2'>" + (days[today.getDay()]) + " " + day + suffix + " " + month + " " + year + "</span>, the time is <span class='flair2'>" + time + "</span> and it is currently <span class='flair2'>" + Math.round(temp) + "°C </span><span>with </span><span class='flair2'>" + cond + "</span><span> in </span><span class='flair2'>" + city + "</span>" + "<span>, </span><span class='flair2'>" + country + "</span>";
  })
  .catch(error => console.log(error));
        },
        function (error) {
          console.error("Error getting location:", error.message);
        }
      );
    }  
  getWeather();
  }

  // Call the showDateAndWeather function initially
  showDateAndWeather();

// Searchbar
const searchEngines = {
    Google: "https://www.google.com/search?q=",
    DuckDuckGo: "https://duckduckgo.com/?q=",
    Bing: "https://www.bing.com/search?q=",
    Yahoo: "https://search.yahoo.com/search?p="
};
const searchField = document.getElementById("search-field");
const clearFieldButton = document.getElementById("clear-field");


if (!Object.keys(searchEngines).includes(searchEngine)) {
    searchEngine = "Google"
}

var searchUrl = searchEngines[searchEngine];

searchField.placeholder = "Search " + searchEngine + "...";

// Check searchbar for keystrokes
searchField.addEventListener("keyup", function(event) {

    // If there is some text in searchbar, display clear-field button
    if (searchField.value != "") {
        clearFieldButton.style.visibility = "visible";
    } else {
        clearFieldButton.style.visibility = "hidden";
    }

    // If last keystroke was "Enter" treat it as search-button is clicked
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-button").click();

    }
});

// Clear text and keep searchbar in focus
function clearField() {
    searchField.value = "";
    clearFieldButton.style.visibility = "hidden";
    searchField.focus()
}

// Search query
function search() {
    if (searchField.value != "") {
        var val = searchField.value;
        window.open(searchUrl + val, "_self");
    }
    clearField();
}


// Show Scrollbar on scrolling
window.addEventListener('scroll', function showScrollbar(e) {
    if (e.target.classList.contains("visible-scrollbar") === false) {
        e.target.classList.add("visible-scrollbar");

        // Hide Scrollbar after 1.5s
        setTimeout(hideScrollbar, 1500, e);
    }
}, true);

// Hide Scrollbar
function hideScrollbar(e) {
    e.target.classList.remove("visible-scrollbar");
}

//Bookmark Table
var tabs = document.querySelectorAll('.tab');
var contents = document.querySelectorAll('.content');
var cards;

function loadCards() {
  if (window.innerWidth > 992) {
    // Load config.js file if screen width is above 992px
    loadScript('config.js', function () {
      // Update cards with the data from config.js
      updateCards();
    });
  } else {
    // Load mconfig.js file if screen width is below or equal to 992px
    loadScript('mconfig.js', function () {
      // Update cards with the new data from mconfig.js
      updateCards();
    });
  }
}

function loadScript(scriptPath, callback) {
  var script = document.createElement('script');
  script.src = scriptPath;
  script.onload = callback;
  document.head.appendChild(script);
}

function updateCards() {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].innerHTML = cards[i].name;

    var sites = Object.keys(cards[i].bookmarks);

    // Clear existing content
    contents[i].innerHTML = '';

    // Populate content with bookmarks
    for (let j = 0; j < sites.length; j++) {
      var a_link = document.createElement('a');
      a_link.innerHTML = sites[j];
      a_link.href = cards[i].bookmarks[sites[j]];

      contents[i].appendChild(a_link);

      // Make tab active on mouse click
    tabs[i].addEventListener('mouseenter', function(){
        for (let j=0; j<tabs.length; j++){
            tabs[j].classList.remove('active');
        }
        tabs[i].classList.add('active');

        for (let j=0; j<contents.length; j++){
            contents[j].classList.remove('active');
        }
        contents[i].classList.add('active');
    })
    }
  }
}

// Call the loadCards function initially
loadCards();

// Attach an event listener to the window resize event
window.addEventListener('resize', loadCards);






