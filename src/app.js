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

// weather search

function displayTemperature(response) {
  console.log(response.data);
  let currentTemp = document.querySelector(".current-temp");
  let city = document.querySelector(".city");
  let weatherCondition = document.querySelector(".weather-condition");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let icon = document.querySelector("#icon");

  currentTemp.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  city.innerHTML = response.data.name;
  weatherCondition.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;
  icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", `response.data.weather[0].description`);
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
