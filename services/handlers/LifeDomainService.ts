import { redisGetOrSet } from "@/lib/cache";
import { iSession } from "@/lib/helpers";
import { fetchLifeDomainsFromDB } from "@/lib/queries/lifeDomainQueries";

const LifeDomainService = {
    async getLifeDomains(userId: string, sessionData: iSession) {
        const cacheKey = `lifeDomains:${userId}`;
        return redisGetOrSet(
            cacheKey, 
            () => fetchLifeDomainsFromDB({ 
                    owner: userId, 
                    sessionData: sessionData 
                }
            ),
            120
        );
    }
};

export default LifeDomainService;
