import { create } from 'zustand';

import type { User } from '@/types/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  needsPasswordReset: boolean;
  setUser: (user: User | null) => void;
  setNeedsPasswordReset: (val: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  needsPasswordReset: localStorage.getItem('must_change_password') === 'true',
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setNeedsPasswordReset: (val) => {
    if (val) localStorage.setItem('must_change_password', 'true');
    else localStorage.removeItem('must_change_password');
    set({ needsPasswordReset: val });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('must_change_password');
    set({ user: null, isAuthenticated: false, needsPasswordReset: false });
  },
}));
