// const express = require("express");
// const mongoose = require("mongoose");
// const config = require("./libs/config");
// const logger = require("./libs/logger");
// const router = require("./routes/api");
// require("dotenv/config");

import express from "express";
import mongoose from "mongoose";
import logger from "./libs/logger.js";
import config from "./libs/config.js";
import router from "./routes/api/index.js";
import dotenv from "dotenv/config";

const app = new express();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connect to DB");
});

// Body Parser
app.use(express.json());

// Router
app.use(router);

//GET
app.get("/", (req, res) => {
    res.send({ msg: "Hello from port " + config.port });
});

app.listen(config.port, () => {
    logger.info(`Server is running at port ${config.port}`);
});
