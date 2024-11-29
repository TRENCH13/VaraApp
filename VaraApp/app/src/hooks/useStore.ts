import { create } from "zustand";

interface AuthState {
    token: string | null;
    setToken: (newToken: string) => void;
    clearToken: () => void;
    isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
    token: null,

    setToken: (newToken: string) => set({ token: newToken }),

    clearToken: () => set({ token: null }),

    isAuthenticated: () => {
        return !!get().token;
    },
}));

export default useAuthStore;