import { useState } from "react";
import { Recipe } from "../framework/schema";
import RecipeModal from "./RecipeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-6 bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h2>
        <div className="gap-3 text-sm text-gray-600 mb-4">
          <p>
            Prep <FontAwesomeIcon icon={faClock} /> : {recipe.prepTime}
          </p>
          <p>
            Total <FontAwesomeIcon icon={faClock} /> : {recipe.totalTime}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span>{recipe.calories} kcal</span>
          <span>{recipe.protein} g P</span>
          <span>{recipe.carbs} g C</span>
          <span>{recipe.fat} g F</span>
        </div>
      </div>

      <RecipeModal
        recipe={recipe}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default RecipeCard;
