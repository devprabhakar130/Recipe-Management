const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    instructions: { type: String, default: "" },
    day: { type: String, default: "" } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
