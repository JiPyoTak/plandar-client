import { create } from 'zustand';

interface IDrawerState {
  isOpened: boolean;
}

interface IDrawerActions {
  toggle: () => void;
}

const useDrawerState = create<IDrawerState & IDrawerActions>((set) => ({
  isOpened: true,
  toggle: () => set((state) => ({ isOpened: !state.isOpened })),
}));

export default useDrawerState;
