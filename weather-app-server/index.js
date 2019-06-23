const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4000;
require("dotenv").config();

app.use(bodyParser.json());

const { DARK_SKY_KEY } = process.env;

app.get("/", async (req, res) => {
  const darkSkyEndpoint = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/42.3601,-71.0589`;
  const darkSkyResult = await axios(darkSkyEndpoint)
    .then(res => res.data)
    .catch(err => {
      throw err;
    });

  res.json({ darkSkyResult });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
