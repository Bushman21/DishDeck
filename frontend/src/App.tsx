import { useState, useRef, type FormEvent } from "react";
import "./App.css";
import { searchRecipes } from "./api";
import type { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  cosnt [selectedRecipe, setSelectedRecipe] = useState(undefined);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await searchRecipes(searchTerm, 1);
      setRecipes(Array.isArray(data) ? data : data.results);
      pageNumber.current = 1;
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await searchRecipes(searchTerm, nextPage);
      const newItems = Array.isArray(nextRecipes) ? nextRecipes : nextRecipes.results;
      setRecipes((prevRecipes) => [...prevRecipes, ...newItems]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.error("Error fetching more recipes:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          required
          placeholder="Enter a search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)}/>
      ))}

      {recipes.length > 0 && (
        <button className="view-more-button" onClick={handleViewMoreClick}>
          View More
        </button>

        { selectedRecipe ? <RecipeModal /> : null}
      )}
    </div>
  );
};

export default App;