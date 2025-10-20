import { create } from "zustand";
import { getStorageItem } from "../../shared/hooks/useStorage";

interface JsonState {
  json: string;
  setJson: (value: string) => void;
  previousJson: string;
  refreshPreviousJson: () => void;
  isInit: boolean;
  init: () => void;
}

const useJsonStore = create<JsonState>((set, get) => {
  return {
    json: "[]",
    previousJson: "[]",
    setJson: (value: string) => {
      set(() => ({ json: value }));
    },
    refreshPreviousJson: () => set((state) => ({ previousJson: state.json })),
    isInit: false,
    init: async () => {
      if (get().isInit) return;
      set({ previousJson: await getStorageItem("recipesJson") ?? "[]", json: await getStorageItem("recipesJson") ?? "[]", isInit: true });
    }
  };
});

export default useJsonStore;
