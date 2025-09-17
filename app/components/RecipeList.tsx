"use client"

import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { Recipe } from "../framework/schema";
import data from "../framework/fakeData";
import { jsonLanguage } from "@codemirror/lang-json";
import ReactCodeMirror from "@uiw/react-codemirror";
import RecipeCard from "./RecipeCard";
import ShoppingListModal from "./ShoppingListModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";

const RecipeList = () => {
    const [json, setJson] = useState<string>(data);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [showShoppingListModal, setShowShoppingListModal] = useState(false);
    const [shoppingList, setShoppingList] = useState<{
        name: string;
        amount: {
            amount: number;
            unit: string;
        }[];
    }[]>();
    const [isDirty, setIsDirty] = useState(false);

    const makeShoppingList = useCallback(() => {
      const getAmounts = (name: string) => {
        const amounts: { amount: number, unit: string }[] = [];

        const ingredients = recipes.flatMap(r => r.ingredients.filter(i => i.name === name));

        ingredients.forEach(i => {
          const existing = amounts.find(a => a.unit === i.unit);

          if (existing) {
            existing.amount += i.amount;
          } else {
            amounts.push({
              amount: i.amount,
              unit: i.unit
            });
          }
        });

        return amounts;
      };

      const distinctIngredientNames = [
        ...new Set(recipes.flatMap(r => r.ingredients.map(i => i.name)))
      ];

      setShoppingList(distinctIngredientNames.map(n => ({
        name: n,
        amount: getAmounts(n)
      })));
    }, [recipes]);

    const updateRecipes = useCallback(() => {
        try {
            setRecipes(JSON.parse(json));
            setIsDirty(false);
        } catch (e) {
            console.log(e);
            toast.error(<div>
            <p>JSON is not formatted correctly.</p>
            {e as SyntaxError ? <p>{(e as SyntaxError).message}</p> : ""}
            </div>);
        }
    }, [json]);

    useEffect(() => {
      makeShoppingList();
    }, [recipes, makeShoppingList]);

    const updateJson = (text: string) => {
      setJson(text);
      setIsDirty(true);
    };

    const showShoppingListButton = !isDirty && shoppingList && shoppingList.length > 0;

    return <div>
        <ReactCodeMirror
            value={json}
            height="200px"
            onChange={updateJson}
            extensions={[jsonLanguage.extension]}
          />
          <div className="flex flex-row ml-10">
            <button
              onClick={updateRecipes}
              className="mt-4 mr-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Update
            </button>
            {showShoppingListButton && <button
              onClick={() => setShowShoppingListModal(true)}
              className="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Shopping list
            </button>}
          </div>
          {showShoppingListButton
          ? <>
            <ShoppingListModal showModal={showShoppingListModal} setShowModal={setShowShoppingListModal} shoppingList={shoppingList} />
            {recipes.map(r => <RecipeCard key={r.name} recipe={r} />)}
          </>
          : <small className="ml-10">Click &apos;Update&apos; to save changes.</small>}
    </div>
};

export default RecipeList;
