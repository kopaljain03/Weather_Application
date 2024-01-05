const express = require("express");
const axios = require("axios");

const app = express();
const apiKey = "47adfc0922e13f885c6822cc19ee2514";

// Middleware to parse JSON in the request body
app.use(express.json());

app.post("/getWeather2", async (req, res) => {
  try {
    const { cities } = req.body;

    // Object to store weather results
    const weatherData = {};

    // Fetch weather for each city using Promise.all
    await Promise.all(
      cities.map(async (city) => {
        try {
          // Make a GET request to the weather API for each city
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );

          // Extract the temperature from the API response
          const temperature = response.data.main.temp;

          // Store the temperature for the city in the weatherData object
          weatherData[city] = `${temperature}°C`;
        } catch (error) {
          // If there's an error fetching weather for a city, store "N/A" for that city
          weatherData[city] = "N/A";
        }
      })
    );

    // Send the weatherData object as the response
    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
