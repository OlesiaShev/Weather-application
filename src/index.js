function formatDate(today)
{
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay = days[now.getDay()];
    
    let hours = now.getHours();  
    if (hours > 0&& hours <10) {
        hours = `0${hours}`;
    };
    let minutes = now.getMinutes();
        if (minutes>0 &&minutes<10) {
        minutes = `0${minutes}`;
    };
let current = `${currentDay}, ${hours}:${minutes}`;
return current;
};

formatDate(new Date());
let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = formatDate(new Date());

function formatDateNew(timestamp)
{
    let date = new Date(timestamp);
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (hours > 0 && hours <10) {
        hours = `0${hours}`;
    };
    let minutes = date.getMinutes();
        if (minutes>0 &&minutes<10) {
        minutes = `0${minutes}`;
    };
    return `${day} ${hours}:${minutes}`;
}
  
function showForecast(response)
{
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    daysForecast = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let forecastHTML = "";
     daysForecast.forEach(function (day)
    {
    forecastHTML = forecastHTML + `
        <div class="col-4 col-sm-2 miniBox">
            ${day}
            <div>20JUN</div>                 
            <div class="border border-primary rounded temperature"><span class="weather-forecast-max">19°</span>/<span
                    class="weather-forecast-min">10°</span></div>
            <div class="border border-primary rounded-circle weatherSigns">
                <i class="fa-solid fa-cloud-sun-rain"></i>
            </div>
            </div>
    `;
    });
    forecastElement.innerHTML = forecastHTML;

}
function getForecast(lon, lat)
{
    console.log(lon);
    console.log(lat);
    let apiKey = "4ac2c287c8855d10edca04e5759fe661";
    let units = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely}&units=${units}&appid=${apiKey}`;
    console.log(apiURL);
    axios.get(apiURL).then(showForecast);
}

function ShowWeatherforCity(response)
{        console.log(response);
        let temperature = Math.round(response.data.main.temp);
        let wind = response.data.wind.speed;
        let description = response.data.weather[0].description;
        let countryCode = response.data.sys.country;
        let humidity = response.data.main.humidity;
        let input = response.data.name;
        let icon = response.data.weather[0].icon;
        let coordLat = response.data.coord.lat;
        let coordLon = response.data.coord.lon;
    
        let currentDegree = document.querySelector(".currentDegree");
        let currentWind = document.querySelector(".currentWind");
        let currentDescription = document.querySelector("#description");
        let currentCountryCode = document.querySelector("#country-code");
        let mainCity = document.querySelector("#main-city");
        let currentHumidity = document.querySelector("#humidity");
        let lastUpdatedTime = document.querySelector("#currentTime");
        let currentIcon = document.querySelector("#icon");
    
        lastUpdatedTime.innerHTML = formatDateNew(response.data.dt*1000);
        currentDegree.innerHTML = temperature;
        currentWind.innerHTML = wind;
        currentDescription.innerHTML = description;
        mainCity.innerHTML = input;
        currentCountryCode.innerHTML = countryCode;
        currentHumidity.innerHTML = humidity;
        currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
        currentIcon.setAttribute("alt", response.data.weather[0].description);
        
    getForecast(coordLat, coordLon);

    let tempF = document.querySelector("#fahrenheit-temperature");
    tempF.addEventListener("click", changeTempToF);
    let tempC = document.querySelector("#celsius-temperature");
    tempC.addEventListener("click", changeTempToC);
            
function changeTempToF(event) 
{
            event.preventDefault();
            let temperatureC = document.querySelector("#weather-in-main-city");
            let temp = temperature;
            let tempF = Math.round(temp * 1.8 + 32);
            temperatureC.innerHTML = tempF;
            document.querySelector("#fahrenheit-temperature").classList.add("active");
            document.querySelector("#celsius-temperature").classList.remove("active");
};

function changeTempToC(event) 
{
            event.preventDefault();
            let temperatureC = document.querySelector("#weather-in-main-city");
            let temp = temperature;
            temperatureC.innerHTML = temp;
            document.querySelector("#fahrenheit-temperature").classList.remove("active");
            document.querySelector("#celsius-temperature").classList.add("active");
};
};

function showCity(input)
{
    let apiKey = "4ac2c287c8855d10edca04e5759fe661";
    let units = "metric";
    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${apiKey}`
    axios.get(apiUrlCity).then(ShowWeatherforCity);


};

function replaceCity(event)
{
    event.preventDefault();
    let entered = document.querySelector("#formGroupExampleInput");
    let input = entered.value;
    let mainCity = document.querySelector("#main-city");
    if (input.length > 2) {
        mainCity.innerHTML = input;
        showCity(input);
    }
    else {
        alert("Enter the real city, please!");
        document.location.reload()
    }
    entered.value = "";
    document.querySelector("#fahrenheit-temperature").classList.add("active");
    document.querySelector("#celsius-temperature").classList.add("active");
};

function showCurrentPosition(position)
{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    let apiKey = "4ac2c287c8855d10edca04e5759fe661";
    let units = "metric";
    let apiUrlbyGPS = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    if (lat.length !== 0 && lon.length !== 0) {
        axios.get(apiUrlbyGPS).then(ShowWeatherforCity)
    };
};

function navigatorStartFunction(event)
{
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentPosition);
};

showCity("London");

let search = document.querySelector("#button-Submit");
search.addEventListener("click", replaceCity);

let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", navigatorStartFunction);






