// src/App.tsx
import { useState } from "react";
import "./App.css";
import { searchRecipes } from "./api";
import type { Recipe } from "./types";
import {  type FormEvent } from 'react';
import RecipeCard from "./components/RecipeCard";

const App = () => {
   const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

const handleSearchSubmit = async (event: FormEvent) => {
  event.preventDefault();
    try {
      const data = await searchRecipes(searchTerm, 1);
      setRecipes(data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };
  const handleViewMoreClick = async ()=>{
    const nextPage = pageNumber.current + 1;
  
     try{
         const nextRecipes = await AudioParam.searchRecipes(searchTerm,nextPage);
         setRecipes([...recipes,...nextrecipes.results])
         pageNumber.current = nextPage;
     }catch(error){
      console.log(error);

     }
  }

  return <div>
     <form onSubmit={(event) => handleSearchSubmit(event)}>
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
       <RecipeCard recipe={recipe}/>
      ))}
      <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
  </div>;
};

export default App;