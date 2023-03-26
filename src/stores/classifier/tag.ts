import { create } from 'zustand';

interface ITagClassifierState {
  hiddenTags: Set<number>;

  toggleTagShow: (tagId: number) => void;

  reset: () => void;
}

const initialState = {
  hiddenTags: new Set<number>(),
} as const;

const useTagClassifierState = create<ITagClassifierState>((set) => ({
  ...initialState,

  toggleTagShow: (tagId: number) =>
    set((state) => {
      const newHiddenTags = new Set(state.hiddenTags);
      if (newHiddenTags.has(tagId)) newHiddenTags.delete(tagId);
      else newHiddenTags.add(tagId);
      return { hiddenTags: newHiddenTags };
    }),

  reset: () => set({ ...initialState }),
}));

export default useTagClassifierState;
