import { create } from 'zustand';

interface IWindowSizesState extends Pick<Window, 'innerWidth' | 'innerHeight'> {
  setWindowSizes: (size: Pick<Window, 'innerWidth' | 'innerHeight'>) => void;
  reset: () => void;
}

const initialState = {
  innerWidth: 0,
  innerHeight: 0,
};

const useWindowSize = create<IWindowSizesState>((set) => ({
  ...initialState,
  setWindowSizes: (size) => set({ ...size }),
  reset: () => set({ ...initialState }),
}));

export default useWindowSize;
