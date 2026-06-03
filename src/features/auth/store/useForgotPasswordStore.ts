import { create } from 'zustand';

interface ForgotPasswordState {
    userId: number | string | null;
    code: number | string | null;
    isVerified: boolean;
    setUserIdAndCode: (userId: number | string, code?: number | string) => void;
    setIsVerified: (status: boolean) => void;
    clear: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
    userId: null,
    code: null,
    isVerified: false,
    setUserIdAndCode: (userId, code) => set({ userId, code: code || null }),
    setIsVerified: (isVerified) => set({ isVerified }),
    clear: () => set({ userId: null, code: null, isVerified: false }),
}));
