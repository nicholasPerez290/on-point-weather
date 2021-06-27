now = moment()
var search = document.querySelector("#search-bar");
var searchBtn = document.querySelector(".searchBtn");
var savedCities = document.querySelector(".saved-cities");
var cityName = document.querySelector("h3");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvIndex = document.querySelector(".uvIndex");
var apiKey = "1db06cfe0cae0f718defbc981f01c67e";
var openPage = function(){
    if(!localStorage.getItem("cityNames")){
        return;
    }
   var arry1 = JSON.parse(localStorage.getItem("cityNames"))
   for(var i = 0; i < arry1.length; i++){
       if(arry1[i]){
    var newCity = document.createElement("div");
        newCity.textContent = arry1[i];
        newCity.setAttribute("class","newCity");
        savedCities.appendChild(newCity);
       }
   }
}
var searching = function(){
    console.log(search.value)
    var city = search.value
    if(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function(response){
       return response.json();
    }).then(function(data){
        console.log(data)
       console.log(data.main.temp)
       if(data){
        var newCity = document.createElement("div")
        newCity.textContent = city;
        newCity.setAttribute("class","newCity");
        savedCities.appendChild(newCity);
        setText(city,data);
        localStorage.setItem(city,JSON.stringify(data));
        var names = JSON.parse(localStorage.getItem("cityNames"));
        console.log(names);
        if(!names){
        var arry = [];
    }else {
        var arry = []
        for(var i = 0; i < names.length; i++){
            console.log(names[i])
            console.log(city)
        arry.push(names[i])
        }
    }
    arry.push(city);
        localStorage.setItem("cityNames",JSON.stringify(arry));
    }
    })
    }
}
var setText = function(city,data){
        cityName.textContent = `${city}       ${now.format('MMMM Do, YYYY')}`;
        temp.textContent = `Temp: ${data.main.temp}`
        wind.textContent = `Wind: ${data.wind.speed}`
        humid.textContent = `Humidity: ${data.main.humidity}`
        uvIndex.textContent = `Feels Like: ${data.main.feels_like}`
}
openPage()
searchBtn.addEventListener("click",function(){
    console.log("working")
    searching()
})
savedCities.addEventListener("click",function(event){
    var currentCity = (event.target);
    var cityValue = currentCity.textContent
    console.log(cityValue)
    var cityData = JSON.parse(localStorage.getItem(cityValue))
    setText(cityValue,cityData)
})