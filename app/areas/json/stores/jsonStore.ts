import { create } from "zustand";

interface JsonState {
  json: string;
  setJson: (value: string) => void;
  previousJson: string;
  refreshPreviousJson: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useJsonStore = create<JsonState>((set) => {
  return {
    json: "[]",
    previousJson: "[]",
    setJson: (value: string) => {
      set(() => ({ json: value }));
    },
    refreshPreviousJson: () => set((state) => ({ previousJson: state.json })),
    loading: true,
    setLoading: (value: boolean) => set(() => ({ loading: value }))
  };
});

export default useJsonStore;
