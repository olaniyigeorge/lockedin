import { iGoal } from "@/app/api/goals/docs";
import { iHabitTask, iHabitTaskEntry } from "@/app/api/habittasks/docs";
import { iLifeDomain } from "@/app/api/lifedomains/[id]/docs";
import { User } from "@/interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



export const DefaultUser: User = {
  _id: "liuvberliv-2rfvsv3-2veevbr",
  email: "devuser0@dev.com",
  first_name: "Dev",
  last_name: "User 0",
  username: "dev-user-0",
  image: "",
  isVerified: false,
  role: "base"
}

interface DashBoardStore {
  habitTasks: iHabitTask[];
  manageHabitTasks: (habitTasks: iHabitTask[]) => void;
  lifeDomains: iLifeDomain[];
  manageLifeDomains: (lifeDomains: iLifeDomain[]) => void;
  goals: iGoal[];
  manageGoals: (goals: iGoal[]) => void;
  habitTaskEntries: iHabitTaskEntry[];
  ManageHabitTaskEntries: (habitTaskEntries: iHabitTaskEntry[]) => void;
  authenticatedUserUser: User | null;
  setAuthenticatedUserUser: (user: User | null) => void;
}



export const useDashboardState = create<DashBoardStore>()(
  persist(
    (set) => ({
      habitTasks: [],
      manageHabitTasks: (open) => set({ habitTasks: []}),
      lifeDomains: [],
      manageLifeDomains: (open) => set({ lifeDomains: []}),
      goals: [],
      manageGoals: (open) => set({ goals: []}),
      habitTaskEntries: [],
      ManageHabitTaskEntries: (open) => set({ habitTaskEntries: []}),
      authenticatedUserUser: DefaultUser,
      setAuthenticatedUserUser: (open) => set({ authenticatedUserUser: DefaultUser})
      // isSidebarOpen: false,
      // toggleSidebarOpen: (open) => set({ isSidebarOpen: open }),

      // isWaitlistModalOpen: false,
      // setIsWaitlistModalOpen: (open) => set({ isWaitlistModalOpen: open }),

      // authToken: null,
      // setAuthToken: (token) => set({ authToken: token }),

      // loggedInUser: null,
      // setLoggedInUser: (user) => set({ loggedInUser: user }),
    }),
    {
      name: "dashboard-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        habitTasks: state.habitTasks,
        // goals: state.goals,
        // authenticatedUserUser: state.authenticatedUserUser
      }),
    }
  )
);
