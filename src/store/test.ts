import { create } from 'zustand';

interface ID {
  id: number;
  increasePopulation: (id: number) => void;
  reset: () => void;
}

const useIdStore = create<ID>((set) => ({
  id: 0,
  increasePopulation: () => set((state) => ({ id: state.id + 1 })),
  reset: () => set({ id: 0 }),
}));

export default useIdStore;
