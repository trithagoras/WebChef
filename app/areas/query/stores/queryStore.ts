import { create } from "zustand";
import { masterQuery } from "../../shared/framework/query";

interface QueryState {
  queryText: string;
  setQueryText: (value: string) => void;
  previousQueryText: string;
  refreshPreviousQueryText: () => void;
  textAreaKey: number; // for refreshing state
  incrementTextAreaKey: () => void;
}

// For DB setting key or localstorage key
export const queryStorageKey = "queryText";

const getInitialQuery = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(queryStorageKey) ?? masterQuery;
  }
  return masterQuery;
};

export const useQueryStore = create<QueryState>()((set) => {
  const initialQuery = getInitialQuery();

  return {
    queryText: initialQuery,
    setQueryText: (value) => set(() => ({ queryText: value })),
    previousQueryText: initialQuery,
    refreshPreviousQueryText: () =>
      set((state) => ({ previousQueryText: state.queryText })),
    textAreaKey: 0,
    incrementTextAreaKey: () =>
      set((state) => ({ textAreaKey: state.textAreaKey + 1 })),
  };
});
