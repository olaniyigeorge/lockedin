import { redisGetOrSet } from "@/lib/cache";
import { iSession } from "@/lib/helpers";
import { fetchHabitTasksFromDB } from "@/lib/queries/habitTaskQueries";

const HabitTaskService = {
  async getHabitTasks(userId: string, session: iSession) {
    const cacheKey = `habitTasks:${userId}`;
    return redisGetOrSet(
        cacheKey, 
        () => fetchHabitTasksFromDB({ 
          owner: userId, 
          sessionData: session, 
          page: 1, 
          limit: 10 }
        ),
        120
    );
  }
};

export default HabitTaskService;
