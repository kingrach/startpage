// GetStarted - A simple responsive Startpage
// Author: MrAlpha786 (github.con/MrAlpha786)

// Username
// Get the current hour
var currentHour = new Date().getHours();
    
// Function to determine the greeting based on the hour
function greeting(hour) {
  var greetingText;
  if (hour >= 5 && hour <= 11) {
    greetingText = "good morning";
  } else if (hour >= 12 && hour <= 16) {
    greetingText = "good afternoon";
  } else if ((hour >= 17 && hour <= 23) || (hour >= 0 && hour <= 4)) {
    greetingText = "good evening";
  } else {
    greetingText = "hello";
  }
  return greetingText;
}

// Set the greeting text in the HTML element with id "username"
document.getElementById("username").innerHTML = greeting(currentHour);

function showDateAndWeather() {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var today = new Date();
    var day = today.getDate();
    var suffix = getOrdinalSuffix(day);
    var monthUpper = today.toLocaleString('default', { month: 'long' });
    var month = monthUpper.toLowerCase();
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
      if ("geolocation" in navigator) {
      // Requesting the user's location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Extracting latitude and longitude from the position object
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);
      },
      function (error) {
        console.error("Error getting location:", error.message);
      }
    )
  } else {
    console.error("Geolocation is not available in this browser.");
  }
      var apiKey = "518139f7a0c9b125beed32a90e71ad39";
      var city = "Mountain Ash";
      var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Get weather data
          const temp = data.main.temp;
          document.getElementById("weather").innerHTML = "it is <span class='flair2'>" + (days[today.getDay()]) + " " + day + suffix + " " + month + " " + year + "</span>, the time is <span class='flair2'>" + time + "</span> and it is currently <span class='flair2'>" + Math.round(temp) + "°C.</span>";
        })
        .catch(error => console.log(error));
    }

    getWeather();
  }

  // Call the showDateAndWeather function initially
  showDateAndWeather();

  // Call the showDateAndWeather function every 1000ms (1 second)
  setInterval(showDateAndWeather, 1000);

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

// Check if dark-mode is enabled
if(localStorage.getItem('darkMode') == 'enabled'){
    document.body.classList.toggle("dark-mode");
}

// Toggle dark-mode of body
function toggleMode() {
    document.body.classList.toggle("dark-mode");

    // Save mode preference to local storage
    // It will keep dark-mode persistant across browser  sessions
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem('darkMode', 'enabled');
    }else{
        localStorage.setItem('darkMode', 'disabled');
    }
}

//Bookmark Table
var tabs = document.querySelectorAll('.tab');
var contents = document.querySelectorAll('.content');

for (let i=0; i<tabs.length; i++){

    tabs[i].innerHTML = cards[i].name;

    var sites = Object.keys(cards[i].bookmarks);
    //Populate content with bookmarks
    for (let j=0; j<sites.length; j++){

        var a_link = document.createElement('a');
        a_link.innerHTML = sites[j];
        a_link.href = cards[i].bookmarks[sites[j]];

        contents[i].appendChild(a_link);
    }

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






