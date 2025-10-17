import { create } from "zustand";
import { masterQuery } from "../../shared/framework/query";
import { getLocalStorageItem } from "../../shared/hooks/useLocalStorage";

interface QueryState {
  queryText: string;
  setQueryText: (value: string) => void;
  previousQueryText: string;
  refreshPreviousQueryText: () => void;
  textAreaKey: number; // for refreshing state
  incrementTextAreaKey: () => void;
}

const getInitialQuery = () => {
  if (typeof window !== "undefined") {
    return getLocalStorageItem<string>("queryText") ?? masterQuery;
  }
  return masterQuery;
};

const useQueryStore = create<QueryState>()((set) => {
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

export default useQueryStore;
