import { iGoal } from "../goals/[id]/docs";
import { HabitTaskWithEntries } from "../habittasks/[id]/docs";
import { eLifeDomain } from "../lifedomains/docs";

export interface DashboardResponse {
    success: boolean;
    data: {
      habitTasks: HabitTaskWithEntries[];
      lifeDomains: eLifeDomain[];
      goals: iGoal[];
      habitTaskEntries: any[];
    };
  }
