'use client';

import { useState } from "react";
import { Recipe } from "../framework/schema";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const RecipeDetails = () => (
        <>
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
                {recipe.ingredients.map(i => (
                    <li key={i.name} className="flex justify-between items-center">
                        <span>{i.name}</span>
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
        </>
    );

    return (
        <>
            <div 
                onClick={openModal}
                className="p-6 bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                <h2 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>{recipe.calories} kcal</span>
                    <span>{recipe.protein} g P</span>
                    <span>{recipe.carbs} g C</span>
                    <span>{recipe.fat} g F</span>
                </div>
            </div>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                            aria-label="Close recipe"
                        >
                            <FontAwesomeIcon icon={faXmark} size="2x" />
                        </button>
                        
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">{recipe.name}</h2>
                        <RecipeDetails />
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeCard;