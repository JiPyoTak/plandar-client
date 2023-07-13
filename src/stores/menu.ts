import { create } from 'zustand';

type TMenuState = 'calendar' | 'category' | 'tag' | 'home';

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
  closeMenu: () => set({ isOpened: false }),
  selectMenu: (selected: TMenuState) =>
    set((state) => ({
      selected,
      isOpened: state.selected === selected ? !state.isOpened : true,
    })),
}));

export type { TMenuState };
export default useMenuState;
