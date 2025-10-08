import { create } from 'zustand'

interface EditModeState {
  editMode: boolean
  toggleEditMode: () => void
}

export const useEditMode = create<EditModeState>()((set) => ({
  editMode: false,
  toggleEditMode: () => set((state) => ({ editMode: !state.editMode }))
}));
