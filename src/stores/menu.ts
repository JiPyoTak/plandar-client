import { create } from 'zustand';

type TMenuState = 'calendar' | 'category' | 'tag' | 'home' | null;

interface IMenuState {
  isOpened: boolean;
  selected: TMenuState;
}

interface IMenuActions {
  closeMenu: () => void;
  selectMenu: (selected: TMenuState) => void;
}

const useMenuState = create<IMenuState & IMenuActions>((set) => ({
  isOpened: true,
  selected: 'home',
  closeMenu: () => set({ isOpened: false, selected: null }),
  selectMenu: (selected: TMenuState) =>
    set((state) => ({
      selected: state.selected === selected ? null : selected,
      isOpened: state.selected === selected ? !state.isOpened : true,
    })),
}));

export type { TMenuState };
export default useMenuState;
