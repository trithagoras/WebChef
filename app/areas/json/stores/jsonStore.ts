import { create } from "zustand";
import fakeData from "../../shared/framework/fakeData";
import { getLocalStorageItem } from "../../shared/hooks/useLocalStorage";

interface JsonState {
  json: string;
  setJson: (value: string) => void;
  previousJson: string;
  refreshPreviousJson: () => void;
}

const getInitialJson = () => {
  if (typeof window !== "undefined") {
    return getLocalStorageItem<string>("recipesJson") ?? fakeData;
  }
  return fakeData;
};

const useJsonStore = create<JsonState>((set) => {
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

export default useJsonStore;
