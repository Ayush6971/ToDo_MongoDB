require("dotenv").config({});

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("./config/db")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
require("./routes/r-index")(app);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to ToDo list App!" });
});

app.listen(PORT, () => {
    console.info(`App is Running at http://localhost:${PORT}`);
});