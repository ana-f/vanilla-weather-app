// hour and day

let date = new Date();
let currentHour = document.querySelector(".hour");
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentHour.innerHTML = `${hour}h${minutes}`;

let weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = weekDays[date.getDay()];
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = `${day}`;

// city weather search

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let weekDay = week[date.getDay()];
  return weekDay;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weekForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div> ${formatDay(forecastDay.dt)} </div>
        <img src = "images/${forecastDay.weather[0].icon}.png" alt= "${
          forecastDay.weather[0].description
        }" width="40px" />
        <div>${Math.round(forecastDay.temp.max)}°</div> 
        <div class="temp-min">${Math.round(forecastDay.temp.min)}°</div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weekForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "031b9daf6c535f08d9a6bdcd27cd718d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  //console.log(response.data);
  let currentTemp = document.querySelector(".current-temp");
  let city = document.querySelector(".city");
  let weatherCondition = document.querySelector(".weather-condition");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let icon = document.querySelector("#icon");
  currentTemp.innerHTML = `${Math.round(
    response.data.main.temp
  )}<span class="celsius">°C</span>`;
  city.innerHTML = response.data.name;
  weatherCondition.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;
  icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "031b9daf6c535f08d9a6bdcd27cd718d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  search(searchCity.value);
}

search("Lisbon");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
