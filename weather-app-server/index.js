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
  try {
    // Get the lat and lng for the requested location (received in the body of the request) from google geocoding api
    const mapsEndPoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${requestedLocation}&key=${MAPS_KEY}`;
    const mapsResult = await axios(mapsEndPoint);

    if (!mapsResult) {
      throw new Error(`Could not find coordinates for ${requestedLocation}`);
    }

    const {
      formatted_address: location,
      geometry: {
        location: { lat, lng }
      }
    } = mapsResult.data.results[0];

    // Get the current weather from the Dark Sky API
    const darkSkyEndpoint = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}`;
    const darkSkyResult = await axios(darkSkyEndpoint);

    if (!darkSkyResult) {
      throw new Error(
        `no results were found from the Dark Sky API for lat: ${lat} and lng: ${lng}`
      );
    }

    const { summary, temperature, icon } = darkSkyResult.data.currently;

    res.send({
      location,
      summary,
      temperature,
      icon
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
