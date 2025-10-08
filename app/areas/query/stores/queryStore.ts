import { create } from 'zustand'

interface QueryState {
  queryText: string,
  setQueryText: (value: string) => void,
  previousQueryText: string,
  refreshPreviousQueryText: () => void,
  textAreaKey: number,  // for refreshing state
  incrementTextAreaKey: () => void
}

// For DB setting key or localstorage key
export const queryStorageKey = 'queryText';

export const useQueryStore = create<QueryState>()((set) => ({
  queryText: '',
  setQueryText: (value) => set(() => ({ queryText: value })),
  previousQueryText: '',
  refreshPreviousQueryText: () => set(state => ({ previousQueryText: state.queryText })),
  textAreaKey: 0,
  incrementTextAreaKey: () => set(state => ({ textAreaKey: state.textAreaKey + 1 }))
}));
