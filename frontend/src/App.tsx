// src/App.tsx
import { useState } from "react";
import "./App.css";
import { searchRecipes } from "./api";
import type { Recipe } from "./types";
const App = () => {
   const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

const handleSearchSubmit = async () => {
    try {
      const data = await searchRecipes(searchTerm, 1);
      setRecipes(data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return <div>
     <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          required
          placeholder="Enter a search term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          Recipe Image Location: {recipe.image}
          <br />
          Recipe Title: {recipe.title}
        </div>
      ))}
  </div>;
};

export default App;