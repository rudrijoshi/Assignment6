var APIKey = "39336e5a4b6e09ecd7e0394de48a7de3";
var cityName = [];
var searchFormEl = document.querySelector('#search-form');
var resultInputEl =  document.querySelector('#result-input');
var resultCon = document.querySelector('#result-content');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#searchInput').value;

    if(!searchInputVal){
        console.error('You need a search input value!');
        return;
    }
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&appid=" + APIKey;
    searchApi(queryURL);
    savedHistory
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function savedHistory(city) {
    if(cityName.indexOf(city) !==-1)
    return;
    cityName.push(city);
    localStorage.setItem('inputHistory', JSON.stringify(cityName));
    displayHistory();
}
 
function displayHistory(city){
document.getElementById("history").innerHTML = "";
for(var i= cityName.length-1; i >=0; i--){
    var btn = document.createElement("button");
    btn.textContent = cityName[i];
    btn.classList.add("history-btn");
    document.getElementById("history").append(btn);
}

}

function pageLoad(){
    var inpHistory = localStorage.getItem('inputHistory');

if (inpHistory){
    cityName = JSON.parse(inpHistory);
}
displayHistory();
}
pageLoad();
document.getElementById("history").onclick= handleSearchHistoryClick;

function handleSearchHistoryClick(e){
if(!e.target.matches(".history-btn"))
return;
var searchInputVal = e.target.textContent;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&appid=" + APIKey;
searchApi(queryURL);
}






function getParams() {
    var searchParamArr = document.location.search.split('&');
}

function printResults(resultObj){
console.log(resultObj);
 var resultCard = document.createElement('div');
 resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'border', 'border-dark', 'p-3');
   

var titleEl = document.createElement('h3')
 titleEl.textContent = resultObj.name;
resultCard.appendChild(titleEl);

var currentDate = new Date();
var dateEl = document.createElement('p');
dateEl.innerHTML = currentDate.toDateString();
resultCard.appendChild(dateEl);


var bodyConEl = document.createElement('p');
 bodyConEl.innerHTML += '<strong>Temp:</strong>' + resultObj.main.temp + 'F' + '<br/>';
 bodyConEl.innerHTML += '<strong>Wind:</strong>' + resultObj.wind.speed + 'MPH' + '<br/>';
 bodyConEl.innerHTML += '<strong>Humidity:</strong>' + resultObj.main.humidity + '%' + '<br/>';


resultCard.append(bodyConEl);
resultCon.appendChild(resultCard);
}

function printResults1(resultObj){
    console.log(resultObj);

    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'border', 'border-dark', 'p-3');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body', 'col-12');
    resultCard.append(resultBody);

     var titleEl = document.createElement('h3');
     titleEl.textContent = "5-Day Forecast:"
     resultBody.appendChild(titleEl);

    var forecastCon = document.createElement('div');
    forecastCon.classList.add('forecast-con');
    resultBody.appendChild(forecastCon);

      var currentDate = new Date();
     currentDate.setDate(currentDate.getDate() + 1);


    for (var i=0; i < 5; i++) {
    var forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-input');
    forecastCon.appendChild(forecastEl);

     var dateEl = document.createElement('p');
     dateEl.textContent = currentDate.toDateString();
    forecastEl.appendChild(dateEl);

    var tempEl = document.createElement('p');
    tempEl.innerHTML = '<strong>Temp:</strong>' + resultObj.main.temp + 'F';
    forecastEl.appendChild(tempEl);

     var windEl = document.createElement('p');
     windEl.innerHTML = '<strong>Wind:</strong>' + resultObj.wind.speed + 'MPH';
    forecastEl.appendChild(windEl);

    var humidityEl = document.createElement('p');
    humidityEl.innerHTML = '<strong>Humidity:</strong>' + resultObj.main.humidity + '%';
    forecastEl.appendChild(humidityEl);

    currentDate.setDate(currentDate.getDate() + 1);
    }

    resultCon.appendChild(resultCard)
}


function searchApi(query){
fetch(query)
.then(function(response){
    if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function(locRes){
        console.log(locRes);
        printResults(locRes);
        printResults1(locRes);
    })
    .catch(function(error){
        console.error(error);
    })
}

