const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4000;
require("dotenv").config();

app.use(bodyParser.json());

const { DARK_SKY_KEY, MAPS_KEY } = process.env;

app.get("/", async (req, res) => {
  const mapsEndPoint = `https://maps.googleapis.com/maps/api/geocode/json?address="London"&key=${MAPS_KEY}`;
  const mapsResult = await axios(mapsEndPoint)
    .then(res => res.data.results[0])
    .catch(err => {
      throw err;
    });

  const { lat, lng } = mapsResult.geometry.location;
  const darkSkyEndpoint = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}`;
  const darkSkyResult = await axios(darkSkyEndpoint)
    .then(res => res.data.currently)
    .catch(err => {
      throw err;
    });

  res.json({ darkSkyResult });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
