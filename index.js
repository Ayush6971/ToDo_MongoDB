require("dotenv").config({});

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Connect to MongoDB
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.info("Successfully Established Connection with MongoDB");
        } else {
            console.error(
                "Failed to Establish Connection with MongoDB with Error: " + err
            );
        }
    }
);

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

// routes
require("./routes/r-index")(app);

app.get("/", (req, res) => {
    res.render("login", { res });
});

app.listen(PORT, () => {
    console.error(`App is Running at http://localhost:${PORT}`);
});