// Date

function showTime() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

//Weather api - Setting default values
let city = "La Plata";
let unit = "metric";

//Weather api - Showing default temp
function showTemp(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let newTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${newTemp}`;
  let actualUnit = document.querySelector("#currentUnit");
  if (unit === "metric") {
    actualUnit.innerHTML = "C";
  } else {
    actualUnit.innerHTML = "F";
  }
}

function lookForWeather(city, unit) {
  let apiKey = "e28aa466d1d85ef673d9691ed7fbb426";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios.get(`${apiURL}${city}&appid=${apiKey}&units=${unit}`).then(showTemp);
}

//Weather api - Showing default city
function showCity() {
  let actualCity = document.querySelector("#currentCity");
  actualCity.innerHTML = `${city.toUpperCase()}`;
}

lookForWeather(city, unit);
showCity();
showCF();

//Search form

function showActualCity(event) {
  event.preventDefault();
  let actualCity = document.querySelector("#currentCity");
  let newCity = document.querySelector("#citySearch");
  actualCity.innerHTML = `${newCity.value.toUpperCase()}`;
  lookForWeather(newCity.value, unit);
  city = newCity.value;
}

let search = document.querySelector("#searchForm");
search.addEventListener("submit", showActualCity);

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
  lookForWeather(city, unit);
  console.log(unit);
}

F.addEventListener("click", changeUnit);
C.addEventListener("click", changeUnit);

//Current city

function getCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e28aa466d1d85ef673d9691ed7fbb426";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?";
  console.log(latitude);
  console.log(longitude);
  axios
    .get(
      `${apiURL}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(findCity);
}

function findCity(response) {
  city = response.data.name;
  lookForWeather(city, unit);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCity);
}

let currentCityBtn = document.querySelector("#currentCityBtn");
console.log(currentCityBtn);
currentCityBtn.addEventListener("click", getLocation);
