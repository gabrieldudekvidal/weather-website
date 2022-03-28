const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

//parse from .html
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "b840b1ff2ff6bdc4683e56db3434f841&";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey +"units=" + unit;
    https.get(url, function (response){
    //Log status of the request
    console.log(response.statusCode);
    //Parse to JSON
    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    //Navigate throught the levels of JSON and getting data
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const city = weatherData.name;
    const icon = weatherData.weather[0].icon;
    const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<h1>The temperature in " + city + " is " + temp + " C</h1>");
    res.write("<p>The weather is currently " + weatherDescription + "</p>");
    res.write("<img src="+ imageUrl +">");
    res.send();
    });
  });
});

app.listen(3000, function(){
    console.log("The server is running on port 3000.");
});
