import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (state: boolean) => void;
}

export const useSidebarStore = create(
  persist<SidebarState>(
    (set) => ({
      isOpen: true,
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      setSidebarOpen: (state) => set({ isOpen: state }),
    }),
    {
      name: "sidebar-state", // key to store the state in localStorage
    }
  )
);
