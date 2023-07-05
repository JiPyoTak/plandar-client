import { create } from 'zustand';

interface ITypeClassifierState {
  showEvent: boolean;
  showTask: boolean;
  showAlarm: boolean;
  toggleEventShow: () => void;
  toggleTaskShow: () => void;
  toggleAlarmShow: () => void;

  reset: () => void;
}

const initialState = {
  showEvent: true,
  showTask: true,
  showAlarm: true,
} as const;

const useTypeClassifierState = create<ITypeClassifierState>((set) => ({
  ...initialState,

  toggleEventShow: () =>
    set((state) => ({
      showEvent: !state.showEvent,
    })),
  toggleTaskShow: () =>
    set((state) => ({
      showTask: !state.showTask,
    })),
  toggleAlarmShow: () =>
    set((state) => ({
      showAlarm: !state.showAlarm,
    })),

  reset: () => set({ ...initialState }),
}));

export default useTypeClassifierState;
