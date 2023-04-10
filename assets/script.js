/* Api key*/
var APIkey = "15cadfd0ee2b826d3df22a7c7961b0ee";
var APIUrl = "https://api.openweathermap.org";

//Global Variables//
var searchForm = document.querySelector("#search-form");
var searchbtnEl = document.querySelector("#citySubmit");
var cityInputEl = document.querySelector("#cityInput");
var currentWeatherEl = document.querySelector("#currentWeather");
var weatherCardEl = document.querySelector("#weatherCard");
var historyEl = document.querySelector("#history");
var currentTempEl = document.querySelector("#currentTemp");
var searchHistory = localStorage.getItem("searchHistory") || [];

function getWeather(weather) {
  console.log(weather);

  // create h2 for name of city
  var city = document.createElement("h2");
  cityName.textContent = weather.name;
  resultsContainer.append(cityName);
  // create <p> for humidity, wind,description, temp, uv
  var temp = document.createElement("p");
  temp.textContent = "Temp: " + weather.main.temp + " F";
  resultsContainer.append(temp);

  var humidity = document.createElement("p");
  humidity.textContent = "humidity: " + weather.main.humidity + " %";
  resultsContainer.append(humidity);

  var wind = document.createElement("p");
  wind.textContent =
    "wind: " + weather.wind.speed + " mph, " + weather.wind.deg + "°";
  resultsContainer.append(wind);
}
var CityConditions = [];
// Inital data when user loads page
// getForecastData()
// function getForecastData() {
//   navigator.geolocation.getCurrentPosition((success) => {
//     let {latitude, longitude } = success.coords;

//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${APIkey}`).then(res => res.json()).then(data => {
//       console.log(data)
//       showForecastData(data);
//     })
//   })
// }
// function showForecastData (data){
//   let{pressure, wind, humidity} = data.current;

//   currentWeatherEl.innerHTML = `<div class="box" style="height:200px;" id="currentWeather"></div>
//   </div>`
// }

var forecastEl = document.querySelector("#current-weather-forecast");
function getFivedayForecast(city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      var forecasts = data.list.map((forecast) => {
        return {
          temperature: forecast.main.temp,
          dateTime: forecast.dt_txt,
          // add more fields here per assignment instructions
        };
      });

      forecasts.forEach((forecast) => {
        var listItemTemp = document.createElement("li");
        listItemTemp.textContent = forecast.temperature;

        var listItemDate = document.createElement("li");
        listItemDate.textContent = forecast.dateTime;

        var listItemWind = document.createElement("li");
        listItemWind.textContent = forecast.dateWind;

        var listItemHumidity = document.createElement("li");
        listItemHumidity.textContent = forecast.dateHumidity;

        forecastEl.appendChild(listItemDate);
        forecastEl.appendChild(listItemTemp);
        forecastEl.appendChild(listItemWind);
        forecastEl.appendChild(listItemHumidity);
      });

      searchHistory.push(city);

      searchHistory.forEach((city) => {
        var listItem = document.createElement("li");
        listItem.textContent = city;

        historyEl.appendChild(listItem);
      });
    });
}
function SaveDataToLocalStorage(data)
{
    var a = [];
        a = JSON.parse(localStorage.getItem('session')) || [];
        a.push(data);
        alert(a);  
    localStorage.setItem('session', JSON.stringify(a));
}
// check if we have search hsiotry, load it we do

// add new cities to search history

// dispaly search history on page

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  var city = cityInputEl.value;
  // getWeather(city);
  getFivedayForecast(city);
  cityInputEl.value = "";
});
//function statPage() {
//initalCityData();
//}

// Uses localStorage to store persistent data//

//console.log('cityInput', data);
// Create if & then conditional statement to weather API data//
var APIUrl;
if (location.protocol === "https:") {
  APIUrl = "https://api.openweathermap.org";
} else {
  APIUrl = '"https://api.openweathermap.org";';
}
// from criteria:  search for a city and receive current & future weather conditions with a search history shown
function startPage() {
  resetElement(weatherCardEl);
  //random list of city searches
  if (cityData) {
    var cityListElement = document.createElement("cityList");
    cityListElement.classList.add("random-list");
    cityListElement.classList.add("w-100");

    //loop needed for local storage data
    for (var i = 0; i < initalCityData.length; i++) {
      var listElement = document.createElement("li");
      var city = initalCityData[i];
      var buttonHtml = `<button class="search-btn" attr="${city}">${city}</button>`;
      listElement.innerHTML = buttonHtml;
      var cityList = document.getElementById("city-list");
      cityList.appendChild(listElement);
    }

    weatherCardEl.appendChild(listElement);
  }
}
//when the user clicks btn current city; use Jquery here
  $(document).on("click", ".list-weatherCardEL-item", function (event) {
  event.preventDefault();

  var city = $(this).attr("attr");
  returnApiFetch(city);
});
