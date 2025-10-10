import { create } from "zustand";
import fakeData from "../../shared/framework/fakeData";

export const jsonStorageKey = "recipesJson";

interface JsonState {
  json: string;
  setJson: (value: string) => void;
  previousJson: string;
  refreshPreviousJson: () => void;
}

const getInitialJson = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(jsonStorageKey) ?? fakeData;
  }
  return fakeData;
};

export const useJsonStore = create<JsonState>((set) => {
  const initialJson = getInitialJson();

  return {
    json: initialJson,
    previousJson: initialJson,
    setJson: (value: string) => {
      set(() => ({ json: value }));
    },
    refreshPreviousJson: () => set((state) => ({ previousJson: state.json }))
  };
});
