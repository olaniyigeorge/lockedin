import { redisGetOrSet } from "@/lib/cache";
import { fetchHabitTaskEntriesFromDB } from "@/lib/queries/habitTaskEntryQueries";

const HabitTaskEntryService = {
    async getHabitTaskEntries(userId: string) {
        const cacheKey = `habitTaskEntries:${userId}`;
        return redisGetOrSet(
            cacheKey,
            () => fetchHabitTaskEntriesFromDB({ owner: userId }),
            120
        );
    }
};

export default HabitTaskEntryService;
