require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

connectDB();


app.use("/api/recipes", recipeRoutes);


const frontendDir = path.join(__dirname, "..", "frontend");
if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir));
  
  app.get(/^\/(?!api).*/, (_req, res) =>
    res.sendFile(path.join(frontendDir, "index.html"))
  );
} else {
  console.warn("⚠️  Frontend folder not found:", frontendDir);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
