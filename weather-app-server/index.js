const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4000;
require("dotenv").config();

app.use(bodyParser.json());

const { DARK_SKY_KEY } = process.env;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
