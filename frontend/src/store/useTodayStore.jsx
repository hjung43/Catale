import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodayStore = create(
  persist(
    (set) => ({
      today: {},
      setToday: (today) => {
        set({ today: today });
      },
    }),
    {
      name: "today-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useTodayStore;
