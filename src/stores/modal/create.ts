import { create } from 'zustand';

interface IModalState {
  isOpen: boolean;
}

interface IModalAction {
  openModal: () => void;
  closeModal: () => void;
}

const initialState: IModalState = {
  isOpen: false,
} as const;

const useCreateModalState = create<IModalState & IModalAction>((set) => ({
  ...initialState,
  openModal: () => {
    set({ isOpen: true });
  },
  closeModal: () => {
    set({ isOpen: false });
  },
}));

export default useCreateModalState;
