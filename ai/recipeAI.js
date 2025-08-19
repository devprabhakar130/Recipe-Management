
function suggestRecipe(ingredients) {
  const list = Array.isArray(ingredients)
    ? ingredients
    : String(ingredients || "").split(",").map(s => s.trim());

  const ing = list.map(s => s.toLowerCase());

  if (ing.some(x => x.includes("egg"))) return "Omelette";
  if (ing.some(x => x.includes("rice"))) return "Fried Rice";
  if (ing.some(x => x.includes("chicken"))) return "Garlic Butter Chicken";
  if (ing.some(x => x.includes("paneer"))) return "Paneer Tikka Masala";
  return "Try a Salad!";
}

module.exports = { suggestRecipe };

