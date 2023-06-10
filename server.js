const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

// app.use(morgan("combined")); //gives all details in console
// app.use(morgan("tiny")); // gives tiny details only
app.use(morgan(":method:status:url 'HTTP/:http-version'"));

app.get("/", (req, res) => {
  res.end("morgan logger app");
});

app.listen(port, () => {
  console.log(`Sever is running on http://localhost${port}`);
});
