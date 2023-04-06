/* Api key*/
var APIkey = "15cadfd0ee2b826d3df22a7c7961b0ee";
var APIUrl = "https://api.openweathermap.org";

//Global Variables//
var searchbtnEl = document.querySelector('#citySubmit');
var cityInputEl = document.querySelector('#cityInput')
var currentWeatherEl = document.querySelector('#currentWeather')
var weatherCardEl = document.querySelector('#weatherCard')
var historyEl = document.querySelector('#history')
var currentTempEl = document.querySelector('#currentTemp')

var CityConditions = [];
// Inital data when user loads page
getWeatherData()
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let {latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${APIkey}`).then(res => res.json()).then(data => {
      console.log(data)
      showWeatherData(data);
    })
  })
}
function showWeatherData (data){
  
}
//function startPage() {
  //initalCityData();
//}

// Uses localStorage to store persistent data//

var data = JSON.parse(localStorage.getItem('cityInput')) || [];
//console.log('cityInput', data);
// Create if & then conditional statement to weather API data//
var APIUrl; 
  if (location.protocol === 'https:') {
    APIUrl = "https://api.openweathermap.org";
  } else {
    APIUrl = '"https://api.openweathermap.org";'
  }
// from criteria:  search for a city and receive current & future weather conditions with a search history shown
function startPage(){
  resetElement(weatherCardEl);
//random list of city searches
  if(cityData){
var cityListElement = document.createElement('cityList');
cityListElement.classList.add("random-list");
cityListElement.classList.add('w-100');
  

//loop needed for local storage data
for( var i =0; i < initalCityData.length; i++){
  var listElement = document.createElement ('li');
  var city = initalCityData[i];
  var buttonHtml = `<button class="search-btn" attr="${city}">${city}</button>`;
  listElement.innerHTML = buttonHtml;
  var cityList = document.getElementById('city-list');
  cityList.appendChild(listElement);
}

weatherCardEl.appendChild(listElement);
}
};
//when the user clicks btn current city; use Jquery here
$(document).on('click', ".list-weatherCardEL-item", function(event) {
  event.preventDefault();
 
  var city = $(this).attr('attr');
  returnApiFetch(city);
});