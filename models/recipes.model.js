const mongoose = require("mongoose")

const Recipe = mongoose.model(
    "Recipe",
    new mongoose.Schema({
        name: String,
        description: String,
        dietary: String
    })
)

module.exports = Recipe