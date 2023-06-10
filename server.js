//morgan logger is use for creating user request token
// uuid helps to make unique user id
// we do all this process to store user information when a user make request on api

const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

morgan.token("id", function getId(req) {
  return req.id;
});

morgan.token("param", function (req, res, param) {
  return "userToken";
});

app.use(assignid);

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// app.use(morgan("combined")); //gives all details in console
// app.use(morgan("tiny")); // gives tiny details only
app.use(morgan(":id:param:method:status:url 'HTTP/:http-version'"));
app.use(
  morgan(":id :param :method :status :url 'HTTP/:http-version'", {
    stream: accessLogStream,
  })
);

app.get("/", (req, res) => {
  res.end("morgan logger app");
});

function assignid(req, res, next) {
  req.id = uuidv4();
  next();
}

app.listen(port, () => {
  console.log(`Sever is running on http://localhost${port}`);
});
