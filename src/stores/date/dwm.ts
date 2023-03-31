import { create } from 'zustand';

import { TDWM } from '@/types';

interface IDWMState {
  selectedDWM: TDWM;
}

interface IDWMAction {
  selectDWM: (dwm: TDWM) => void;
}

const initialState = {
  selectedDWM: '일',
} as const;

const useDWMState = create<IDWMState & IDWMAction>((set) => ({
  ...initialState,
  selectDWM: (dwm: TDWM) => set({ selectedDWM: dwm }),
}));

export default useDWMState;
