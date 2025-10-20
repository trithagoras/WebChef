import { create } from "zustand";

interface QueryState {
  queryText: string;
  setQueryText: (value: string) => void;
  previousQueryText: string;
  refreshPreviousQueryText: () => void;
  textAreaKey: number; // for refreshing state
  incrementTextAreaKey: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useQueryStore = create<QueryState>()((set) => {
  return {
    queryText: "",
    setQueryText: (value) => set(() => ({ queryText: value })),
    previousQueryText: "",
    refreshPreviousQueryText: () =>
      set((state) => ({ previousQueryText: state.queryText })),
    textAreaKey: 0,
    incrementTextAreaKey: () =>
      set((state) => ({ textAreaKey: state.textAreaKey + 1 })),
    loading: true,
    setLoading: (value: boolean) => set(() => ({ loading: value }))
  };
});

export default useQueryStore;
