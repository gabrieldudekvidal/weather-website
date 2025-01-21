import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        res.render("weather", {citySearch: ""});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred.");
    }
});

app.post("/", async (req, res) => {
    try {
        const city = req.body.city;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b840b1ff2ff6bdc4683e56db3434f841&units=metric`);
        const result = response.data;
        res.render("weather.ejs", { data: result, citySearch: city})
    } catch (err) {
        
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});