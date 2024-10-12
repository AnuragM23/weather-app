const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

const checkWeather = async (city) => {
  const api_key = "58b985108e3642a7d365964dcb7c96a8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  console.log(weather_data);

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  } else {
    location_not_found.style.display = 'none';
    weather_body.style.display = 'flex';
  }

  temperature.innerHTML = `${(weather_data.main.temp - 273.15).toFixed(
    2
  )} <sup>°C</sup>`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
  description.innerHTML = `${weather_data.weather[0].description}`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "./assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "./assets/clear.png";
      break;
    case "Thunderstorm":
      weather_img.src = "./assets/thunder.png";
      break;
    case "Rain":
      weather_img.src = "./assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "./assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "./assets/snow.png";
      break;
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(inputBox.value);
  }
});
