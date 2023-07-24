import { create } from 'zustand';

export interface IUser {
  id: number;
  username: string;
  email: string;
  profileImage: string;
}

interface IUserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  reset: () => void;
}

const useUserStore = create<IUserState>((set) => ({
  user: {
    id: 1,
    username: '',
    email: '',
    profileImage: '',
  },
  setUser: (user) => set({ user }),
  reset: () => set({ user: null }),
}));

export default useUserStore;
