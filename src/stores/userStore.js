import { create } from "zustand";

const useUserStore = create((set) => {
  let parsedUser = null;
  const stored = localStorage.getItem("user");

  if (stored && stored !== "undefined") {
    try {
      parsedUser = JSON.parse(stored);
    } catch (e) {
      console.warn("Failed to parse stored user, resetting to null", e);
      parsedUser = null;
    }
  }

  return {
    user: parsedUser,
    setUser: (userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData });
    },
    logout: () => {
      localStorage.removeItem("user");
      set({ user: null });
    },
  };
});

export default useUserStore;
