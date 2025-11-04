import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TypeUser } from "../types/user.types";

interface UserStore {
  token: string;
  user: TypeUser | null;
  setUser: (user: TypeUser | null) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      token: "",
      user: null,

      setUser: (user: TypeUser | null) => set({ user }),
      setToken: (token: string) => set({ token }),

      logout: () => set({ user: null, token: "" }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      // Persistencia de 1 día
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        timestamp: Date.now(),
      }),
      // Middleware para validar expiración
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const oneDay = 24 * 60 * 60 * 1000;
        const saved = localStorage.getItem("user-storage");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Date.now() - parsed.state.timestamp > oneDay) {
            localStorage.removeItem("user-storage");
          }
        }
      },
    }
  )
);
