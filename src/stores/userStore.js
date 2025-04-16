import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useUserStore;
