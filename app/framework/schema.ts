export interface Ingredient {
    name: string,
    amount: number,
    unit: string,
    isStaple: boolean
}

export interface Recipe {
    name: string,
    ingredients: Ingredient[],
    protein: number,
    carbs: number,
    fat: number,
    calories: number,
    prepTime: string,
    totalTime: string,
    servings: number,
    steps: string[]
}

export interface ShoppingListItem {
  name: string,
  isStaple: boolean,
  amount: {
    amount: number,
    unit: string
  }[]
}
