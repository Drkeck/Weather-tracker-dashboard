var cityInputEl = document.querySelector('#city');
var savedCities = document.querySelector('.list-group');
var cityDate = document.querySelector('#city-and-date');
var cityTemp = document.querySelector('#temp');
var cityHumid = document.querySelector('#humid');
var cityWind = document.querySelector('#wind-speed');
var cityUv = document.querySelector('#uv-index');
var cityListId = 0;
var citiesList = {};

var userInput = function(event) {
    event.preventDefault();
    var userCity = document.querySelector('#city-search').value;
    logInput(userCity);
    weatherapicall(userCity);
}

var logInput = function(userCity) {
    var listEl = document.createElement("a");
    listEl.classList = "list-group-item text-dark"
    listEl.setAttribute('href', './index.html?city=' + userCity);
    listEl.textContent = userCity;
    savedCities.appendChild(listEl);
}

var weatherapicall = function(userCity) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=208b092a8fbdf8fceaf08ebd60cc31df";
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                var cityLon = data.city.coord.lon;
                var cityLat = data.city.coord.lat;
                var cityName = data.city.name
                var tempCityDay = data.list[0].dt_txt.slice(8,10);
                var tempCityMon = data.list[0].dt_txt.slice(5,7);
                var tempCityY = data.list[0].dt_txt.slice(0,4)
                cityDate.textContent = cityName + " " + tempCityMon + "/" + tempCityDay + "/" + tempCityY;
                createForecast(cityLat, cityLon);
            });
        } else {
            alert('Error: ' + response.statusText)
        }
    });
}

var createForecast = function(lat, lon) {
    var dailyForCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=208b092a8fbdf8fceaf08ebd60cc31df'
    fetch(dailyForCall).then(function(response) {
        response.json().then(function(data) {
            console.log(data.daily[0]);
            cityTemp.textContent = data.daily[0].temp.day;
            cityHumid.textContent = data.daily[0].humidity;
            cityWind.textContent = data.daily[0].wind_speed;
            cityUv.textContent = data.daily[0].uvi;
            if (data.daily[0].uvi > 8.0) {
                cityUv.classList = "bg-danger text-light rounded p-1";
            }
            else if (data.daily[0].uvi > 3.0 && data.daily[0].uvi < 8.0) {
                cityUv.classList = "bg-warning text-light rounded p-1";
            }
            else {
                cityUv.classList = "bg-success text-light rounded p-1";
            }
            for (var i = 1; i < 6; i++) {
                var tempTemp = document.querySelector('#temp-' + [i]);
                var tempHumi = document.querySelector('#humid-' + [i]);
                tempTemp.textContent = data.daily[i].temp.day
                tempHumi.textContent = data.daily[i].humidity + "%"
            }
        })
    });
}

cityInputEl.addEventListener("submit", userInput);