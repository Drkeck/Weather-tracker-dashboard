var cityInputEl = document.querySelector('#city');
var savedCities = document.querySelector('.list-group');
var cityNam = document.querySelector("#city-name")
var cityDate = document.querySelector('#city-date');
var cityIcon = document.querySelector('#icon');
var cityTemp = document.querySelector('#temp');
var cityHumid = document.querySelector('#humid');
var cityWind = document.querySelector('#wind-speed');
var cityUv = document.querySelector('#uv-index');
var listId = 0
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

    citiesList[listId] = userCity;

    listId++
    if (listId === 5) {
        listId = 0
    };

    localStorage.setItem("City List", JSON.stringify(citiesList));

    savedCities.appendChild(listEl);
}

var cityButton = function() {
    var queryString = document.location.search;
    var cityNameBar = queryString.split("=");
    if (!cityNameBar[1]) {
        return;
    }
    weatherapicall(cityNameBar[1]);
}

var weatherapicall = function(userCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=208b092a8fbdf8fceaf08ebd60cc31df";
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                var cityLon = data.city.coord.lon;
                var cityLat = data.city.coord.lat;
                var localcityNam = data.city.name
                var tempCityDay = data.list[0].dt_txt.slice(8,10);
                var tempCityMon = data.list[0].dt_txt.slice(5,7);
                var tempCityY = data.list[0].dt_txt.slice(0,4)
                var localcityDate = tempCityMon + "/" + tempCityDay + "/" + tempCityY;
                cityNam.innerHTML = localcityNam + " <span id='city-date'>" + localcityDate + "</span>";
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
            cityIcon.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '@2x.png')
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
                var tempicon = document.querySelector('#icon-' + [i]);
                var tempDates = document.querySelector('#Date-' + [i]);
                var tempTemp = document.querySelector('#temp-' + [i]);
                var tempHumi = document.querySelector('#humid-' + [i]);
                var currentDate = moment(document.querySelector("#city-date").textContent);
                tempTemp.textContent = data.daily[i].temp.day;
                tempHumi.textContent = data.daily[i].humidity + "%";
                tempDates.textContent = currentDate.add(i, "days").format('MM/DD/YYYY');
                tempicon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png');
            }
        })
    });
}

var loadData = function() {
    citiesList = JSON.parse(localStorage.getItem("City List"));
    if (!citiesList) {
        citiesList = {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
        };
        return;
    } else {
        for (var i = 0; i < 5; i++) {
            var tempCityName = citiesList[i];
            if (!tempCityName){
                return;
            }
            logInput(tempCityName);
        }
    }
}

cityInputEl.addEventListener("submit", userInput);


loadData();
cityButton();