const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4000;
require("dotenv").config();

app.use(bodyParser.json());

const { DARK_SKY_KEY, MAPS_KEY } = process.env;

app.post("/weather", async (req, res) => {
  const { requestedLocation } = req.body;

  // Get the lat and lng for the requested location (received in the body of the request) from google geocoding api
  const mapsEndPoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${requestedLocation}&key=${MAPS_KEY}`;
  const mapsResult = await axios(mapsEndPoint)
    .then(res => res.data.results[0])
    .catch(err => {
      throw err;
    });

  const location = mapsResult.formatted_address;
  const { lat, lng } = mapsResult.geometry.location;

  // Get the current weather from the Dark Sky API
  const darkSkyEndpoint = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}`;
  const darkSkyResult = await axios(darkSkyEndpoint)
    .then(res => res.data.currently)
    .catch(err => {
      throw err;
    });

  const { summary, temperature, icon } = darkSkyResult;

  res.send({
    location,
    summary,
    temperature,
    icon
  });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
