import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { verifyToken } from "@/services/auth";

import { User } from "@/types/user";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      login: (token: string, userData: User) => {
        localStorage.setItem("jua-bareh-token", token);
        set({
          user: userData,
          isLoading: false,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("jua-bareh-token");
        set({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },

      initializeAuth: async () => {
        try {
          const token = localStorage.getItem("jua-bareh-token");
          if (token) {
            const userData = await verifyToken();
            set({
              user: userData,
              isLoading: false,
              isAuthenticated: true,
            });
          } else {
            set({ isLoading: false, isAuthenticated: false });
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          localStorage.removeItem("jua-bareh-token");
          set({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "jua-bareh-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
