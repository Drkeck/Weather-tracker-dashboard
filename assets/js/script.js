var cityInputEl = document.querySelector('#city')
var savedCities = document.querySelector('.list-group')
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
                createForecast(data);
                getUvIndex(data);
            });
        } else {
            alert('Error: ' + response.statusText)
        }
    });
}

var createForecast = function(data) {

}

var getUvIndex = function(data) {
    var cityLon = data.city.coord.lon;
    var cityLat = data.city.coord.lat;
    var uvApiUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid=208b092a8fbdf8fceaf08ebd60cc31df&lat=' + cityLat +'&lon=' + cityLon;
    fetch(uvApiUrl).then(function(response){
        response.json().then(function(uvIndex) {
            console.log(uvIndex);
        })
    })
}

cityInputEl.addEventListener("submit", userInput);