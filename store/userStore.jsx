import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }, false, 'setUser'),
    }),
    {
      name: "user-store",
    }
  )
);