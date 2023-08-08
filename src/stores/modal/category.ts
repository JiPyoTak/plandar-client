import { create } from 'zustand';

type TCategoryEditType = 'create' | 'edit' | null;

interface ICategoryModalState {
  type: TCategoryEditType;
  isOpen: boolean;
  id: number | null;
}
interface ICategoryModalAction {
  openCreateCategory: () => void;
  setCategoryEditable: (categoryId: number) => void;
  closeCategoryModal: () => void;
}

const initialState = {
  type: null,
  isOpen: false,
  id: null,
} as const;

type TCategoryStore = ICategoryModalState & ICategoryModalAction;
const useCategoryModalState = create<TCategoryStore>((set) => ({
  ...initialState,

  openCreateCategory: () =>
    set({
      type: 'create',
      isOpen: true,
      id: null,
    }),

  setCategoryEditable: (categoryId) =>
    set({
      type: 'edit',
      isOpen: true,
      id: categoryId,
    }),

  closeCategoryModal: () => set({ ...initialState }),
}));

export default useCategoryModalState;
