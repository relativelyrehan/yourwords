const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app = express();

mongoose.connect("mongodb://localhost:27017/nameDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const nameSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
    //field: fieldtype
});

const Name = mongoose.model("Name", nameSchema);

const name = new Name({
    name: "Rehan Alam",
    rating: 8,
    review: "mongo code snippet",
    //field: "field description"
});


name.save();