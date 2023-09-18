const apiKey = "734fe60df3c974f4c5f3810ec55133d5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
var searchInput = document.querySelector(".search-input");
var searchBtn = document.querySelector(".search-btn");
var weatherIcon = document.querySelector(".weather-icon");
var card = document.querySelector(".card");

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();
        console.log(data);
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/overcast-day.svg";
            card.style.background = "linear-gradient(135deg, #ff3e9d, #0e1f40)";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.svg";
            card.style.background = "linear-gradient(135deg, #13547a, #0396ff)";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.svg";
            card.style.background = "linear-gradient(135deg, #6cd0ff, #1c2e4c)";
        }
        else if (data.weather[0].main == "Mist" || data.weather[0].main == "Fog") {
            weatherIcon.src = "./images/mist.svg";
            card.style.background = "linear-gradient(135deg, #014871, #a0ebcf)";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/clear-day.svg";
            card.style.background = "linear-gradient(135deg, #9f015e, #f9c929)";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "./images/snow.svg";
            card.style.background = "linear-gradient(135deg, #ccfbff, #ef96c5)";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"
    }
}   
searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim(); // Trim to remove leading/trailing spaces
    if (city !== "") {
        checkWeather(city);
    }
})

searchInput.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        const city = searchInput.value.trim();
        if (city !== "") {
            checkWeather(city);
        }
    }
})
