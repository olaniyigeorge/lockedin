import { iGoal } from "@/app/api/goals/docs";
import { iHabitTask } from "@/app/api/habittasks/docs";
import { eLifeDomain } from "@/app/api/lifedomains/docs";
import { iHabitTaskEntry } from "@/app/api/taskentries/docs";

import HabitTaskService from "@/services/handlers/HabitTaskService";
import GoalService from "@/services/handlers/GoalService";
import { iSession } from "@/lib/helpers";
import LifeDomainService from "@/services/handlers/LifeDomainService";
import HabitTaskEntryService from "@/services/handlers/HabitTaskEntryService";

export class DashboardManager {
  private session: iSession;
  private userId: string;
  private habitTasks: iHabitTask[] = [];
  private goals: iGoal[] = [];
  private lifeDomains: eLifeDomain[] = [];
  private habitTaskEntries: iHabitTaskEntry[] = [];

  constructor(userId: string, session: iSession) {
    this.userId = userId;
    this.session = session;
  }

  // MAIN AGGREGATION METHOD — Called from API
  async getDashboardData(): Promise<Record<string, any>> {
    // Fetch each data set via respective service
    this.goals = (await GoalService.getUserGoals(this.userId)).goals;
    this.habitTasks = (await HabitTaskService.getHabitTasks(this.userId, this.session)).habitTasks;
    this.lifeDomains = (await LifeDomainService.getLifeDomains(this.userId, this.session)).lifeDomains;
    this.habitTaskEntries = (await HabitTaskEntryService.getHabitTaskEntries(this.userId)).habitTaskEntries;

    return {
      habitTasks: this.habitTasks,
      lifeDomains: this.lifeDomains,
      goals: this.goals,
      habitTaskEntries: this.habitTaskEntries,
    };
  }
}




// // Example usage:
// const dashboard = new DashboardManager('user123');
// console.log(dashboard);
// dashboard.addHabitTask({ 
//         _id: '1', 
//         owner: "23r4fv35v5",
//         goal: "f34t35g5464g",
//         aspect: "g345g4g6g4", 
//         title: 'Morning Run', 
//         description: 'Run 5km', 
//         accessibility: "public",
//         interval: 1,
//         frequency: "daily",
//         isActive: true, 
//         start_date: new Date,
//         end_date: new Date, 
//         createdAt: new Date,
//         updatedAt: new Date, 
//     });

// dashboard.addGoal({ 
//         _id: 'g1', 
//         owner: "er2vrveve2r4rg4fib", 
//         name: "Weight Loss", 
//         description: 'Lose 5kg in 3 months', 
//         privacy: "public",
//         isAchieved: false,
//         targetDate: `${new Date}`,
//         createdAt: "",
//         updatedAt: "" 
//     });


// // dashboard.addDailyTask({ id: 't1', title: 'Read a book', completed: false, scheduledDate: new Date() });



// console.log(dashboard.getDashboardSummary());