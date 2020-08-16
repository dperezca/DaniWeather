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

function showTime() {
  let now = new Date();
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
  let minute = now.getMinutes();

  return `${weekday}, ${month} ${day}<sup>th</sup>  ${hour}:${minute}`;
}

let time = document.querySelector("#date");
time.innerHTML = showTime();

// Declare variables
let city = "Barcelona";
let unit = "metric";

// Get city

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeolocationTemp);
}

function getGeolocationTemp(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e28aa466d1d85ef673d9691ed7fbb426";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(
      `${apiURL}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    )
    .then(updateWeather);
}

navigator.geolocation.getCurrentPosition(getGeolocationTemp);

// Update weather
function updateWeather(response) {
  console.log(response);
  // City
  city = response.data.name; // Update on global variable
  let currentCity = document.querySelector("#currentCity"); // Where to update
  currentCity.innerHTML = `${city}`; // Update
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
  searchCityTemp(city, unit);
}

function searchCityTemp(city, unit) {
  console.log(city);
  let apiKey = "e28aa466d1d85ef673d9691ed7fbb426";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiURL}${city}&appid=${apiKey}&units=${unit}`)
    .then(updateWeather);
}

//Change C/F

function showCF() {
  let F = document.querySelector("#F");
  let C = document.querySelector("#C");
  if (unit === "metric") {
    F.innerHTML = `<a href="#" class="link" >°F </a>`;
    C.innerHTML = `°C `;
  } else {
    C.innerHTML = `<a href="#" class="link" >°C </a>`;
    F.innerHTML = `°F `;
  }
}

function changeUnit(event) {
  event.preventDefault();
  if (unit === "metric") {
    unit = "imperial";
  } else {
    unit = "metric";
  }
  showCF();
  searchCityTemp(city, unit);
  console.log(unit);
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

console.log(getNextDays(2));
