import { create } from 'zustand';

interface IUserState {
  user: {
    id: number;
    username: string;
    email: string;
    profileImage: string;
  } | null;
  reset: () => void;
}

const useUserStore = create<IUserState>((set) => ({
  user: null,
  reset: () => set({ user: null }),
}));

export default useUserStore;
