export interface Ingredient {
    name: string,
    amount: number,
    unit: string
}

export interface Recipe {
    name: string,
    ingredients: Ingredient[],
    protein: number,
    carbs: number,
    fat: number,
    calories: number,
    steps: string[]
}

export interface ShoppingListItem {
  name: string,
  amount: {
    amount: number,
    unit: string
  }
}

export const masterQuery = `Generate 5 cheap & healthy dinner ideas (for 2 ppl). Criteria:
- ~500-800 kcal/serving
- Include solid protein source (preferred meats: beef, chicken, pork, fish, tofu; turkey mince OK; veg OK)
- Balanced macros (P, C, F)
- Est. macros/serving (P, C, F in g, kcal)
- Avoid rare/1-use/expensive ingredients

Output JSON only:
[
  {
    name: string,
    ingredients: [{ name: string, amount: number, unit: string }],
    protein: number,
    carbs: number,
    fat: number,
    calories: number,
    steps: [string]
  }
]

Steps = minimal, based style (e.g. “Heat oil in a soup pot and saute onions for 5 minutes”, “Add garlic and ginger and saute 5 more minutes.”, “Add 4 cups of water and stir. Add tomatoes and lentils. Bring to a boil and then lower the heat a bit and simmer for 20 minutes.”). No extra text.
Do not search web.`;