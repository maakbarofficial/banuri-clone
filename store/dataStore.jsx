import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDataStore = create(
  persist(
    (set) => ({
      abwabs: [], // must match name everywhere
      setAbwaab: (abwaabData) => set({ abwabs: abwaabData }), // fixed

      posts: [],
      setPost: (postData) => set({ posts: postData }),
    }),
    {
      name: "data-store",
    }
  )
);