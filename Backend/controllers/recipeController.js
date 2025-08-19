const Recipe = require("../models/recipeModel");
const { suggestRecipeByIngredients } = require("../../ai/recipeAI");


exports.getRecipes = async (_req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
};


exports.addRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
};

exports.updateRecipe = async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};


exports.deleteRecipe = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
};

exports.aiSuggest = async (req, res) => {
  const ingredients = (req.body.ingredients || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const suggestion = suggestRecipeByIngredients(ingredients);
  res.json({ suggestion });
};
