function displayTemperature(response) {
  let currentTemp = document.querySelector(".current-temp");
  let city = document.querySelector(".city");
  let weatherCondition = document.querySelector(".weather-condition");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  city.innerHTML = response.data.name;
  weatherCondition.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`; // está em nós?
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;
}

let apiKey = "031b9daf6c535f08d9a6bdcd27cd718d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
