import { create } from 'zustand'

interface JsonState {
  json: string,
  setJson: (value: string) => void,
  previousJson: string,
  refreshPreviousJson: () => void
}

// For DB setting key or localstorage key
export const jsonStorageKey = 'json';

export const useJsonStore = create<JsonState>()((set) => ({
  json: '',
  setJson: (value) => set(() => ({ json: value })),
  previousJson: '',
  refreshPreviousJson: () => set(state => ({ previousJson: state.json }))
}));
