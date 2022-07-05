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

            
function ShowWeatherforCity(response)
{
        let temperature = Math.round(response.data.main.temp);
        let wind = response.data.wind.speed;
        let descrition = response.data.weather[0].description;
        let countryCode = response.data.sys.country;
        let currentDegree = document.querySelector(".currentDegree"); ///
        let currentWind = document.querySelector(".currentWind");// 
        let currentDescription = document.querySelector("#descrition"); // 
        let currentCountryCode = document.querySelector("#country-code");//
        let mainCity = document.querySelector("#main-city");
        let input = response.data.name;
        console.log(input);
        currentDegree.innerHTML = temperature;
        currentWind.innerHTML = wind;
        currentDescription.innerHTML = descrition;
        mainCity.innerHTML = input;
        currentCountryCode.innerHTML = countryCode;

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
};

function changeTempToC(event) 
{
            event.preventDefault();
            let temperatureC = document.querySelector("#weather-in-main-city");
            let temp = temperature;
            temperatureC.innerHTML = temp;
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

let search = document.querySelector("#button-Submit");
search.addEventListener("click", replaceCity);

let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", navigatorStartFunction);






