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

var logInput = function(city) {
    var listEl = document.createElement("a");
    listEl.classList = "list-group-item text-dark"
    listEl.setAttribute('href', './index.html?city=' + city);
    listEl.textContent = city;
    savedCities.appendChild(listEl);
}

var weatherapicall = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=208b092a8fbdf8fceaf08ebd60cc31df";
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText)
        }
    })
}

cityInputEl.addEventListener("submit", userInput);