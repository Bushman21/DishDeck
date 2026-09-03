import "dotenv/config"; 
import express, { Request, Response } from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api.js";
import { PrismaClient } from "@prisma/client";

const app = express();
const prismaClient = new PrismaClient();
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

app.post("/api/recipes/favourite", async (req, res) => {
  
    const recipeId  = req.body.recipeId;

    try {
      const favoriteRecipe = await prismaClient.favouriteRecipes.create({
        data: {
          recipeId: recipeId,
        },

      });

      return res.status(201).json(favoriteRecipe);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Oops! something went wrong" });
  }
});

app.get("/api/recipes/favourite", async (req, res) => {

  try {
    const recipes = await prismaClient.favouriteRecipes.findMany();
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());
    return res.status(200).json(recipeIds);
  } catch (error) {
    console.error("=== Favourite Recipes Error Details ===", error);
    return res.status(500).json({ error: "Failed to fetch favourite recipes" });
  }

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});