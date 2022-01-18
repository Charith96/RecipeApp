//import dependencies
const mongoose = require("mongoose");

//create new schema
const Recipe = new mongoose.Schema(
    {
        recipeId: { type: Number },
        recipeName: { type: String },
        ingredients: { type: String },
        description: { type: String }
    }
);

//export Recipe model for router usage
module.exports = mongoose.model("Recipe", Recipe);