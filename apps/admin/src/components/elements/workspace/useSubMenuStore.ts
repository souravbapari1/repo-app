import { create } from "zustand";

interface SubMenuState {
  openSubMenus: { [key: string]: boolean };
  toggleSubMenu: (index: string) => void;
  setSubMenuState: (index: string, state: boolean) => void;
  resetState: () => void;
}

export const useSubMenuStore = create<SubMenuState>((set) => ({
  openSubMenus: {}, // Keep track of which submenus are open
  toggleSubMenu: (index: string) =>
    set((state) => ({
      openSubMenus: {
        ...state.openSubMenus,
        [index]: !state.openSubMenus[index], // Toggle the specific submenu
      },
    })),
  setSubMenuState: (index: string, state: boolean) =>
    set((state: any) => ({
      openSubMenus: {
        ...state.openSubMenus,
        [index]: state, // Set the state for a specific submenu
      },
    })),
  resetState: () => set({ openSubMenus: {} }),
}));
