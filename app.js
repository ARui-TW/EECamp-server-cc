const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = new express();

// PORT
const PORT = process.env.PORT || 3000;

//GET
app.get("/", (req, res) => {
    res.send(`Hello from port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(PORT, () => {
    console.log("Connect to DB");
});

app.listen(PORT);
