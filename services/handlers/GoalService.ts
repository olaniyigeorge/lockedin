import { redisGetOrSet } from "@/lib/cache";
import { fetchGoalsFromDB } from "@/lib/queries/goalQueries";

const GoalService = {
  async getUserGoals(userId: string) {
    const cacheKey = `goals:${userId}`;
    return redisGetOrSet(cacheKey, () =>
      fetchGoalsFromDB({ owner: userId, page: 1, limit: 10 }),
      120
    );
  }
};

export default GoalService;
