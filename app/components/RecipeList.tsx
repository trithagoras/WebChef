"use client"

import { useState, useCallback, useEffect } from "react";
import { Recipe, ShoppingListItem } from "../framework/schema";
import RecipeCard from "./RecipeCard";
import ShoppingListModal from "./ShoppingListModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import EditableTextBlock from "./EditableTextBlock";
import fakeData from "../framework/fakeData";
import Skeleton from "react-loading-skeleton";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [init, setInit] = useState(false);

  const makeShoppingList = useCallback((recipes: Recipe[]) => {
    const getAmounts = (name: string) => {
      const amounts: { amount: number; unit: string }[] = [];

      const ingredients = recipes.flatMap(r =>
        r.ingredients.filter(i => i.name === name)
      );

      ingredients.forEach(i => {
        const existing = amounts.find(a => a.unit === i.unit);
        if (existing) {
          existing.amount += i.amount;
        } else {
          amounts.push({ amount: i.amount, unit: i.unit });
        }
      });

      return amounts;
    };

    const distinctIngredientNames = [
      ...new Set(recipes.flatMap(r => r.ingredients.map(i => i.name))),
    ];

    // jank
    const isStaple = (n: string) => recipes.flatMap(r => r.ingredients).find(i => i.name === n)?.isStaple ?? false;

    return distinctIngredientNames.map(n => ({
      name: n,
      amount: getAmounts(n),
      isStaple: isStaple(n)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => Number(b.isStaple) - Number(a.isStaple));
  }, []);

  const onSaveJson = useCallback((value: string) => {
    setRecipes(JSON.parse(value));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInit(true);
      const value = localStorage.getItem("recipesJson") ?? fakeData;
      setRecipes(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      setShoppingList(makeShoppingList(recipes));
    } else {
      setShoppingList([]);
    }
  }, [recipes, makeShoppingList]);

  if (!init) {
    return <Skeleton count={10} />;
  }

  const showShoppingListButton = shoppingList.length > 0;

  return (
    <div>
      <EditableTextBlock mode="json" onSave={onSaveJson} />
      <div className="flex flex-row ml-10">
        {showShoppingListButton && (
          <button
            onClick={() => setShowShoppingListModal(true)}
            className="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Shopping list
          </button>
        )}
      </div>
      {showShoppingListButton ? (
        <>
          <ShoppingListModal
            showModal={showShoppingListModal}
            setShowModal={setShowShoppingListModal}
            shoppingList={shoppingList}
          />
          {recipes.map(r => (
            <RecipeCard key={r.name} recipe={r} />
          ))}
        </>
      ) : (
        <small className="ml-10">
          There are no recipes with valid ingredients.
        </small>
      )}
    </div>
  );
};

export default RecipeList;
