import { create } from 'zustand';

interface ITypeClassifierState {
  type: {
    showEvent: boolean;
    showTask: boolean;
    showAlarm: boolean;
  };

  toggleEventShow: () => void;
  toggleTaskShow: () => void;
  toggleAlarmShow: () => void;

  reset: () => void;
}

const initialState = {
  type: {
    showEvent: true,
    showTask: true,
    showAlarm: true,
  },
} as const;

const useTypeClassifierState = create<ITypeClassifierState>((set) => ({
  ...initialState,

  toggleEventShow: () =>
    set((state) => ({
      type: { ...state.type, showEvent: !state.type.showEvent },
    })),
  toggleTaskShow: () =>
    set((state) => ({
      type: { ...state.type, showTask: !state.type.showTask },
    })),
  toggleAlarmShow: () =>
    set((state) => ({
      type: { ...state.type, showAlarm: !state.type.showAlarm },
    })),

  reset: () => set({ ...initialState }),
}));

export default useTypeClassifierState;
