import { create } from "zustand";
import { getStorageItem } from "../../shared/hooks/useStorage";

interface QueryState {
  queryText: string;
  setQueryText: (value: string) => void;
  previousQueryText: string;
  refreshPreviousQueryText: () => void;
  textAreaKey: number; // for refreshing state
  incrementTextAreaKey: () => void;
  isInit: boolean;
  init: () => void;
}

const useQueryStore = create<QueryState>()((set, get) => {
  return {
    queryText: "",
    setQueryText: (value) => set(() => ({ queryText: value })),
    previousQueryText: "",
    refreshPreviousQueryText: () =>
      set((state) => ({ previousQueryText: state.queryText })),
    textAreaKey: 0,
    incrementTextAreaKey: () =>
      set((state) => ({ textAreaKey: state.textAreaKey + 1 })),
    isInit: false,
    init: async () => {
      if (get().isInit) return;
      set({ queryText: await getStorageItem("queryText"), previousQueryText: await getStorageItem("queryText"), isInit: true });
    }
  };
});

export default useQueryStore;
