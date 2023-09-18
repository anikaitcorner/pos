import { create } from "zustand";

interface IUseSidebar {
  open: () => void;
  isSidebarActive: boolean;
  action: (is: boolean) => void;
}

export const useSidebar = create<IUseSidebar>((set) => ({
  isSidebarActive: true,
  open: () =>
    set((state) => ({
      isSidebarActive: !state.isSidebarActive,
    })),
  action: (is) => set({ isSidebarActive: is }),
}));
