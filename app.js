const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName +"&appid=b840b1ff2ff6bdc4683e56db3434f841&units=metric";
    
    https.get(url, function (response){
        console.log(response.statusCode);

    response.on("data", function(data){
    const parseWeatherData = JSON.parse(data);
    const temp = parseWeatherData.main.temp;
    const weatherDescription = parseWeatherData.weather[0].description;
    const city = parseWeatherData.name;
    const icon = parseWeatherData.weather[0].icon;
    //const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.render("list", {resultCity:city});
    res.render("list", {resultTemperature:Math.floor(temp)});
    res.render("list", {resultWeatherDesc:weatherDescription});
     });     
});

app.listen(3000, function(){
    console.log("The server is running on port 3000.");
});
