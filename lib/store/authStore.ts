import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,
      isLoading: true,

      setUser: (user: User) => {
        set(() => ({ user, isAuthenticated: true, isLoading: false }));
      },

      clearIsAuthenticated: () => {
        set(() => ({ user: null, isAuthenticated: false, isLoading: false }));
      },

      setLoading: (loading: boolean) => {
        set(() => ({ isLoading: loading }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
