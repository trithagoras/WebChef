"use client";

import { useState, useCallback, useEffect } from "react";
import { Recipe, ShoppingListItem } from "../../shared/framework/schema";
import RecipeCard from "./RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import MainJsonEditArea from "../../json/components/MainJsonEditArea";
import fakeData from "../../shared/framework/fakeData";
import Skeleton from "react-loading-skeleton";
import ShoppingListModal from "./ShoppingListModal";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [init, setInit] = useState(false);

  const makeShoppingList = useCallback((recipes: Recipe[]) => {
    const getAmounts = (name: string) => {
      const amounts: { amount: number; unit: string }[] = [];

      const ingredients = recipes.flatMap((r) =>
        r.ingredients.filter((i) => i.name === name)
      );

      ingredients.forEach((i) => {
        const existing = amounts.find((a) => a.unit === i.unit);
        if (existing) {
          existing.amount += i.amount;
        } else {
          amounts.push({ amount: i.amount, unit: i.unit });
        }
      });

      return amounts;
    };

    const distinctIngredientNames = [
      ...new Set(recipes.flatMap((r) => r.ingredients.map((i) => i.name))),
    ];

    // jank
    const isStaple = (n: string) =>
      recipes.flatMap((r) => r.ingredients).find((i) => i.name === n)
        ?.isStaple ?? false;

    return distinctIngredientNames
      .map((n) => ({
        name: n,
        amount: getAmounts(n),
        isStaple: isStaple(n),
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => Number(b.isStaple) - Number(a.isStaple));
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
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <MainJsonEditArea />
      </div>
      <div className="flex flex-row ml-10 justify-center">
        {showShoppingListButton && (
          <div className="flex justify-center my-6">
            <button
              onClick={() => setShowShoppingListModal(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-green-600 text-white text-xl font-bold shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faList} className="text-2xl" />
              Shopping List
            </button>
          </div>
        )}
      </div>
      {showShoppingListButton ? (
        <>
          <ShoppingListModal
            showModal={showShoppingListModal}
            setShowModal={setShowShoppingListModal}
            shoppingList={shoppingList}
          />
          <div className="grid gap-6 lg:grid-cols-2 mt-6">
            {recipes.map((r) => (
              <RecipeCard key={r.name} recipe={r} />
            ))}
          </div>
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
