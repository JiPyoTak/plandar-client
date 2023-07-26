import { create } from 'zustand';

interface ITagClassifierState {
  hiddenTags: Set<string>;

  toggleTagShow: (tagId: string) => void;

  reset: () => void;
}

const initialState = {
  hiddenTags: new Set<string>(),
} as const;

const useTagClassifierState = create<ITagClassifierState>((set) => ({
  ...initialState,

  toggleTagShow: (tagId: string) =>
    set((state) => {
      const newHiddenTags = new Set(state.hiddenTags);
      if (newHiddenTags.has(tagId)) newHiddenTags.delete(tagId);
      else newHiddenTags.add(tagId);

      return { hiddenTags: newHiddenTags };
    }),

  reset: () => set({ ...initialState }),
}));

export default useTagClassifierState;
