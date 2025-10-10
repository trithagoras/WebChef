import { create } from 'zustand'

interface EditModeState {
  isEditing: boolean
  toggleEditMode: () => void
}

export const useEditMode = create<EditModeState>()((set) => ({
  isEditing: false,
  toggleEditMode: () => set((state) => ({ isEditing: !state.isEditing }))
}));
