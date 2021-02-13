
const mongoose = require("mongoose")

const Menu = mongoose.model(
    "Menu",
    new mongoose.Schema({
        recipeId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe"
            }
        ],
        price: String
    })
)

module.exports = Menu