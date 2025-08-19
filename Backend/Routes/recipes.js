
const express = require("express");
const router = express.Router();

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");


const { suggestRecipe } = require("../../ai/recipeAI");

router.get("/", getRecipes);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);


router.post("/ai-suggest", (req, res) => {
  const raw = req.body?.ingredients ?? "";
  const suggestion = suggestRecipe(raw);
  res.json({ suggestion });
});


router.get("/count", async (_req, res) => {
  const Recipe = require("../models/recipeModel");
  res.json({ count: await Recipe.estimatedDocumentCount() });
});

module.exports = router;
