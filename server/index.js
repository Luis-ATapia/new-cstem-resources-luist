const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = "8080";

// Create express app:
const app = express();

// Import .env variables:
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("...connected to db");
        app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
    })
    .catch((err) => {
        console.log(`...could not connect to the database. Error: \n${err}`);
    });

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Router Middleware:
app.use("/cstem-api", require("./routes/index.js"));

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

