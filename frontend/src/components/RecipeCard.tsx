import { type Recipe } from "../types";
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  onFavouriteButton: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick, onFavouriteButton }: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-title">
        <span onClick={(event) => {
          event.stopPropagation()
          onFavouriteButton(recipe)
        }}>
          <AiOutlineHeart size={25} />
        </span>
        <h3>{recipe.title}</h3>      
      </div>
    </div>
  );
};

export default RecipeCard;