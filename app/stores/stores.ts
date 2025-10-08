import { create } from 'zustand'

interface CookingModeState {
  cookingMode: boolean
  toggleCookingMode: () => void
}

export const useCookingMode = create<CookingModeState>()((set) => ({
  cookingMode: false,
  toggleCookingMode: () => set((state) => ({ cookingMode: !state.cookingMode }))
}));
