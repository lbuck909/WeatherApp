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
var resetBtnEl = document.querySelector('resetBtn')

function getWeather(weather) {
  console.log(weather);

  // create h2 for name of city
  var cityName = document.createElement("h2");
  cityName.textContent = weather.name;
  resultsContainer.append(cityName);
  // create <p> for humidity, wind,description, temp, 
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

var forecastEl = document.querySelector("#current-weather-forecast");
function getFivedayForecast(city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      
      
    
    var forecasts = ""
    for(let i=0;i<data.list.length;i=i+8){
      var forecast = data.list[i]
      forecasts += `
        <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${forecast.dt_txt}</h5>
    <p class="card-text">humidity: ${forecast.main.humidity}</p>
    <p class="card-text">wind: ${forecast.wind.speed}</p>
    <p class="card-text">temp: ${temperature(forecast.main.valNum)}</p>
  </div>
</div>
        `
    }
     forecastEl.innerHTML = forecasts;
      // forecasts.forEach((forecast) => {
      //   var listItemTemp = document.createElement("li");
      //   listItemTemp.textContent = forecast.temperature;

      //   var listItemDate = document.createElement("li");
      //   listItemDate.textContent = forecast.dateTime;

      //   var listItemWind = document.createElement("li");
      //   listItemWind.textContent = forecast.dateWind;

      //   var listItemHumidity = document.createElement("li");
      //   listItemHumidity.textContent = forecast.dateHumidity;

        // forecastEl.appendChild(listItemDate);
        // forecastEl.appendChild(listItemTemp);
        // forecastEl.appendChild(listItemWind);
        // forecastEl.appendChild(listItemHumidity);
    //  });

      searchHistory.push(city);

      searchHistory.forEach((city) => {
        var listItem = document.createElement("li");
        listItem.textContent = city;

        historyEl.appendChild(listItem);
      });
    });

    function temperature(valNum) {
      valNum = parseFloat(valNum);
      return ((valNum-273.15)*1.8)+32;

      // console.log(temperature);
    }

}
function SaveDataToLocalStorage(data)
{
    var a = [];
        a = JSON.parse(localStorage.getItem('session')) || [];
        a.push(data);
        alert(a);  
    localStorage.setItem('session', JSON.stringify(a));
}


searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  var city = cityInputEl.value;
  // getWeather(city);
  getFivedayForecast(city);
  cityInputEl.value = "";
});

var APIUrl;
if (location.protocol === "https:") {
  APIUrl = "https://api.openweathermap.org";
} else {
  APIUrl = "https://api.openweathermap.org";
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

function resetBtn() {
  document.getElementById("resetBtn").reset();
}