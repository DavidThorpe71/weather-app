const express = require("express");
const port = 4000;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
