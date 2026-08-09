import "dotenv/config"; // <--- Add this at line 1!
import express, { Request, Response } from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api.js";

const app = express();

app.use(express.json());
app.use(cors());

// Change "/api/recipe/search" to "/api/recipes/search"
app.get("/api/recipes/search", async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string) || 1;

    if (!searchTerm) {
      return res.status(400).json({ 
        error: "searchTerm query parameter is required. Example: /api/recipes/search?searchTerm=pasta&page=1" 
      });
    }

    const results = await RecipeAPI.searchRecipes(searchTerm, page);
    return res.json(results);
  } catch (error) {
    console.error("=== Recipe API Error Details ===", error);
    return res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});