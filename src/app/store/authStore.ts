import { create } from 'zustand';

import type { User } from '@/types/User';
import {
  getMustChangePassword,
  removeAccessToken,
  removeMustChangePassword,
  removeUserId,
  saveMustChangePassword,
} from '@/lib/authStorage';

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
  needsPasswordReset: getMustChangePassword() === 'true',
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setNeedsPasswordReset: (val) => {
    if (val) saveMustChangePassword();
    else removeMustChangePassword();
    set({ needsPasswordReset: val });
  },
  logout: () => {
    removeAccessToken();
    removeUserId();
    removeMustChangePassword();
    set({ user: null, isAuthenticated: false, needsPasswordReset: false });
  },
}));
