import { Recipe } from "../framework/schema";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useCookingMode } from "./CookingModeContext";
import Modal from "./Modal";

interface RecipeModalProps {
    recipe: Recipe,
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const RecipeModal = ({ recipe, isModalOpen, setIsModalOpen }: RecipeModalProps) => {
    const { cookingMode, toggleCookingMode } = useCookingMode();

    return <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={recipe.name}
    >
        <label className="inline-flex items-center cursor-pointer mb-6">
            <input
            type="checkbox"
            className="sr-only peer"
            checked={cookingMode}
            onChange={toggleCookingMode}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">Cooking mode</span>
        </label>

        <div className="gap-3 text-sm text-gray-600 mb-4">
          <p>Prep <FontAwesomeIcon icon={faClock} /> : {recipe.prepTime}</p>
          <p>Total <FontAwesomeIcon icon={faClock} /> : {recipe.totalTime}</p>
        </div>

        <div className="text-gray-700 mb-4">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            <span><span className="font-medium">Calories:</span> {recipe.calories} kCal</span>
            <span><span className="font-medium">Protein:</span> {recipe.protein} g</span>
            <span><span className="font-medium">Carbs:</span> {recipe.carbs} g</span>
            <span><span className="font-medium">Fat:</span> {recipe.fat} g</span>
            </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            {recipe.ingredients
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => Number(b.isStaple) - Number(a.isStaple))
            .map(i => (
                <li key={i.name} className="flex justify-between items-center">
                <span className={i.isStaple ? "font-bold" : "font-medium"}>{i.name}</span>
                <span>{i.amount} {i.unit}</span>
                </li>
            ))}
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Method</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {recipe.steps.map((s, index) => (
            <li key={index}>{s}</li>
            ))}
        </ol>
    </Modal>
};

export default RecipeModal;
