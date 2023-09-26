const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRoute");

require("./utils/database")

const app = express();

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use("/api/user", userRoute);

const PORT = process.env.PORT_ONE || 3005;

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
