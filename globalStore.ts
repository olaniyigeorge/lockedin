import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "./interface";

interface GlobalState {
  mobileNav: boolean;
  toggleMobileNav: (mobileNav: boolean) => void;
  isSidebarOpen: boolean;
  toggleSidebarOpen: (isSidebarOpen: boolean) => void;
  authToken: string | null;
  setAuthToken: (authToken: string | null) => void;
  isWaitlistModalOpen: boolean;
  setIsWaitlistModalOpen: (isWaitlistModalOpen: boolean) => void;
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
}

export const useGlobalState = create<GlobalState>()(
  persist(
    (set) => ({
      mobileNav: false,
      toggleMobileNav: (open) => set({ mobileNav: open }),
      isSidebarOpen: false,
      toggleSidebarOpen: (open) => set({ isSidebarOpen: open }),

      isWaitlistModalOpen: false,
      setIsWaitlistModalOpen: (open) => set({ isWaitlistModalOpen: open }),

      authToken: null,
      setAuthToken: (token) => set({ authToken: token }),

      loggedInUser: null,
      setLoggedInUser: (user) => set({ loggedInUser: user }),
    }),
    {
      name: "eweko-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        authToken: state.authToken,
        loggedInUser: state.loggedInUser,
      }),
    }
  )
);
