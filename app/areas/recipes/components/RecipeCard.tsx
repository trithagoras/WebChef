"use client";
import { jsonLanguage } from "@codemirror/lang-json";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "codemirror";
import { useState, useMemo } from "react";
import { editableTheme } from "../../json/CodeEditorThemes";
import { useEditMode } from "../../shared/stores/editModeStore";
import RecipeModal from "./RecipeModal";
import useJsonStore from "../../json/stores/jsonStore";
import Skeleton from "react-loading-skeleton";

const RecipeCard = ({ index }: { index: number }) => {
  const { json, setJson, loading } = useJsonStore();
  const { isEditing } = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const extensions = useMemo(
    () => [jsonLanguage.extension, editableTheme, EditorView.editable.of(true)],
    []
  );

  const parsedJson = useMemo(() => {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) {
        return parsed[index] || null;
      }
    } catch (e) {
      console.error("Invalid JSON", e);
    }

    return null;
  }, [json, index]);

  if (loading) {
    return <Skeleton height={100} />;
  }

  const handleChange = (newRecipeJson: string) => {
    try {
      const newRecipe = JSON.parse(newRecipeJson);
      const parsed = JSON.parse(json);

      if (Array.isArray(parsed)) {
        parsed[index] = newRecipe;
        setJson(JSON.stringify(parsed, null, 2));
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Don't update if JSON is invalid
    }
  };

  const recipe = parsedJson;

  if (!recipe) {
    return null;
  }

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Editing Recipe: {recipe.name}
        </h2>
        <ReactCodeMirror
          value={JSON.stringify(recipe, null, 2)}
          height="200px"
          onChange={handleChange}
          extensions={extensions}
          className="bg-white text-sm border border-gray-300 rounded"
        />
      </div>
    );
  }

  // Default view (read-only)
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-6 bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h2>
        <div className="gap-3 text-sm text-gray-600 mb-3">
          <p>
            Prep <FontAwesomeIcon icon={faClock} /> : {recipe.prepTime}
          </p>
          <p>
            Total <FontAwesomeIcon icon={faClock} /> : {recipe.totalTime}
          </p>
        </div>
        <p className="text-sm mb-3 text-gray-600">Serves : {recipe.servings}</p>
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
