// Show date and time

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();

function showTime(dateInfo) {
  let now = new Date(dateInfo * 1000);
  let weekday = weekdays[now.getDay()];
  let day = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  if (now.getHours() < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (now.getMinutes() < 10) {
    minute = `0${minute}`;
  }

  return `${weekday}, ${month} ${day}<sup>th</sup>  ${hour}:${minute}`;
}

function getTime(time) {
  time = new Date(time * 1000);
  let hour = time.getHours();
  if (time.getHours() < 10) {
    hour = `0${hour}`;
  }
  let minute = time.getMinutes();
  if (time.getMinutes() < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

// Declare variables
let city = "Barcelona";
let unit = "metric";
let latitude = 41.39;
let longitude = 2.16;
//

searchByName();
searchForecast();
showTime();

// Search by name

function searchByName() {
  let apiKey = "d3d18b4de61cbdf36ec875b64e7d8cae";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiURL}${city}&appid=${apiKey}&units=${unit}`)
    .then(updateWeather, searchError);
}

// Get coordenates of the city
// When we have geolocation

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByLocation, locationError);
}

function locationError() {
  $(`#basicExampleModal`).modal("show");
}

function searchError() {
  $(`#basicExampleModal`).modal("show");
}

// Search for the weather
function searchByLocation(position) {
  let apiKey = "e28aa466d1d85ef673d9691ed7fbb426";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?";
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  axios
    .get(
      `${apiURL}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    )
    .then(updateWeather);
}

// Update weather
function updateWeather(response) {
  console.log(response);
  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;
  city = response.data.name;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${city}`;
  // Temperature
  let currentTemp = document.querySelector("#currentTemp");
  let newTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${newTemp}`;
  // Units
  let actualUnit = document.querySelector("#currentUnit");
  if (unit === "metric") {
    actualUnit.innerHTML = "C";
  } else {
    actualUnit.innerHTML = "F";
  }
  // Icon
  let icon1 = document.querySelector("#icon0");
  icon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png">`;
  searchForecast();
  //Time
  let time = document.querySelector("#date");
  time.innerHTML = showTime(response.data.dt);
  //Humidity
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  // Wind
  let wind;
  let windUnit;
  if (unit === "metric") {
    wind = Math.round(response.data.wind.speed * 3.6 * 100) / 100;
    windUnit = "km/hr";
  } else {
    wind = Math.round(response.data.wind.speed * 100) / 100;
    windUnit = "miles/hr";
  }
  document.querySelector("#wind").innerHTML = `${wind} ${windUnit}`;
  document.querySelector("#sunrise").innerHTML = getTime(
    response.data.sys.sunrise
  );
  document.querySelector("#sunset").innerHTML = getTime(
    response.data.sys.sunset
  );
}

// "CURRENT BUTTON"

let currentBtn = document.querySelector("#currentCityBtn");
currentBtn.addEventListener("click", getLocation);

// "SEARCH BUTTON"
let searchBtn = document.querySelector("#searchForm");
searchBtn.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();

  let newCity = document.querySelector("#citySearch");
  city = newCity.value;
  searchByName();
  newCity.value = "";
}

//Change C/F

function changeUnit(event) {
  event.preventDefault();
  if (unit === "metric") {
    unit = "imperial";
    F.disabled = true;
    C.disabled = false;
  } else {
    unit = "metric";
    C.disabled = true;
    F.disabled = false;
  }
  searchByName();
}

F.addEventListener("click", changeUnit);
C.addEventListener("click", changeUnit);

//Next days
function getNextDays(i) {
  if (now.getDay() + i < 7) {
    let dayNum = now.getDay() + i;
    return dayNum;
  } else {
    let dayNum = now.getDay() + i - 7;
    return dayNum;
  }
}

document.querySelector("#day1").innerHTML = `${weekdays[getNextDays(1)]}`;
document.querySelector("#day2").innerHTML = `${weekdays[getNextDays(2)]}`;
document.querySelector("#day3").innerHTML = `${weekdays[getNextDays(3)]}`;
document.querySelector("#day4").innerHTML = `${weekdays[getNextDays(4)]}`;
document.querySelector("#day5").innerHTML = `${weekdays[getNextDays(5)]}`;
document.querySelector("#day6").innerHTML = `${weekdays[getNextDays(6)]}`;

// Get forecast

function searchForecast() {
  let apiKey = "e28aa466d1d85ef673d9691ed7fbb426";
  let apiURL = "https://api.openweathermap.org/data/2.5/onecall?";
  axios
    .get(
      `${apiURL}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    )
    .then(showForecast);
}

function showForecast(response) {
  for (var i = 1; i < 7; i++) {
    document.querySelector(`#day${i}-min`).innerHTML = `${Math.round(
      response.data.daily[getNextDays(i)].temp.min
    )}`;
    document.querySelector(`#day${i}-max`).innerHTML = `${Math.round(
      response.data.daily[getNextDays(i)].temp.max
    )}`;
    document.querySelector(
      `#icon${i}`
    ).innerHTML = `<img class="imgforecast" src="http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png">`;
  }
}
