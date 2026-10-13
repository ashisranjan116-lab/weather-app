import { apiKey, apiUrl } from "./config.js";

const searchInput =document.querySelector(".search-input");
const searchIcon =document.querySelector(".search-icon");
const weatherIconImg =document.querySelector(".weather-icon-img");
const temperatureEL =document.querySelector(".temperature");
const cityNameEL =document.querySelector(".city-name");
const humidityEl =document.querySelector(".humidity-details span");
const windSpeedEl =document.querySelector(".wind-speed-details span");


function getWeatherImage(cloudiness) {
    if (cloudiness >50) {
        return "sun.jpg";
    }else if (cloudiness > 20){
        return "cloud.jpg";
    }else  {
        return "slightRain.jpg";
    }
}


async function checkWeather (city) {
    try{
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        cityNameEL.textContent = data.name;
        temperatureEL.textContent = `${Math.round(data.main.temp)}°C`;
        humidityEl.textContent = `${data.main.humidity}%`;
        windSpeedEl.textContent = `${data.wind.speed} Km/h`;
        weatherIconImg.src = getWeatherImage(data.clouds.all);
        console.log({data});
    }  catch (error) {
       
    }
}


searchIcon.addEventListener("click",() =>{
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.")
    }
});


checkWeather("Mumbai");