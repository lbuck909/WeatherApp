/* Api key*/
var APIkey = "15cadfd0ee2b826d3df22a7c7961b0ee";


var searchbtnEl = document.querySelector('#citySubmit');
var cityInputEl = document.querySelector('#cityInput')
var todaysWeatherEl = document.querySelector('#todaysWeather')
var weatherCardEl = document.querySelector('#weatherCard')
var historyEl = document.querySelector('#history')

var todaysWeatherEl = $('#todaysWeather');
    todaysWeatherEl.addClass('border border-primary');

//use Open Weather Map API to get searched city weather//
function getCurrentCityWeather(data) {

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIkey;
  fetch(weatherUrl)
    .then(function(response) {
      return response.json();
    })
}