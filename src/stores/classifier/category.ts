import { create } from 'zustand';

interface ICategoryClassifierState {
  hiddenCategories: Set<number>;

  toggleCategoryShow: (categoryId: number) => void;

  reset: () => void;
}

const initialState = {
  hiddenCategories: new Set<number>(),
} as const;

const useCategoryClassifierState = create<ICategoryClassifierState>((set) => ({
  ...initialState,

  toggleCategoryShow: (categoryId: number) =>
    set((state) => {
      const newHiddenCategories = new Set(state.hiddenCategories);
      if (newHiddenCategories.has(categoryId))
        newHiddenCategories.delete(categoryId);
      else newHiddenCategories.add(categoryId);

      return { hiddenCategories: newHiddenCategories };
    }),

  reset: () => set({ ...initialState }),
}));

export default useCategoryClassifierState;
