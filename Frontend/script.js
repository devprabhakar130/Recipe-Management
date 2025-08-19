
const API = "/api/recipes";


async function fetchRecipes() {
  const res = await fetch(API);
  const data = await res.json();
  document.getElementById("recipes").innerHTML = data.map(r => `
    <div class="recipe">
      <h3>${r.title} ${r.day ? `<span class="badge">${r.day}</span>` : ""}</h3>
      <p><b>Ingredients:</b> ${(r.ingredients || []).join(", ")}</p>
      <p><b>Instructions:</b> ${r.instructions || "-"}</p>
      <button class="danger" onclick="deleteRecipe('${r._id}')">Delete</button>
    </div>
  `).join("");

  
  const badge = document.getElementById("count");
  if (badge) badge.textContent = data.length ? `${data.length} total` : "No recipes yet";
}

async function addRecipe() {
  const recipe = {
    title: document.getElementById("title").value.trim(),
    ingredients: document.getElementById("ingredients").value.split(",").map(s=>s.trim()).filter(Boolean),
    instructions: document.getElementById("instructions").value.trim(),
    day: document.getElementById("day").value
  };
  if (!recipe.title) return alert("Title is required");
  await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(recipe) });
  fetchRecipes();
}

async function deleteRecipe(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchRecipes();
}

document.addEventListener("DOMContentLoaded", () => {
  const aiBtn = document.getElementById("aiBtn");
  if (!aiBtn) return; 

  aiBtn.addEventListener("click", async () => {
    const ingredients = document.getElementById("ingredients").value;
    try {
      const res = await fetch(`${API}/ai-suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients })
      });
      const { suggestion } = await res.json();


      document.getElementById("aiOut").textContent = suggestion ? `Suggestion: ${suggestion}` : "No suggestion";
      if (suggestion) document.getElementById("title").value = suggestion;
    } catch (e) {
      console.error(e);
      document.getElementById("aiOut").textContent = "AI suggestion failed.";
    }
  });
});


fetchRecipes();

window.addRecipe = addRecipe;
window.deleteRecipe = deleteRecipe;
