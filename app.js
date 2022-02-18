const express = require("express");
const mongoose = require("mongoose");
const config = require("./libs/config");
const logger = require("./libs/logger");
require("dotenv/config");

const app = new express();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connect to DB");
});

//GET
app.get("/", (req, res) => {
    res.send({ msg: "Hello from port " + config.port });
});

app.listen(config.port, () => {
    logger.info(`Server is running at port ${config.port}`);
});
