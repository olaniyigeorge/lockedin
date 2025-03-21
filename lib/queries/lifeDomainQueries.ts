import LifeDomain from "@/models/life-domain";
import { connectToDB } from "@/services/db_mongo";

export async function fetchLifeDomainsFromDB({
    owner,
    sessionData,
    page = 1,
    limit = 10,
}: {
    owner?: string;
    sessionData?: any;
    page?: number;
    limit?: number;
}) {
    await connectToDB();

    const filter: any = {};

    // Role-based filtering logic
    if (owner) {
        filter.owner = owner;
    } else if (!sessionData || sessionData.user.role !== "admin") {
        throw new Error("Unauthorized: You can't access all life domains");
    }

    // Fetch total count for pagination
    const totalLifeDomains = await LifeDomain.countDocuments(filter);
    const totalPages = Math.ceil(totalLifeDomains / limit);

    // Fetch life domains with pagination
    const lifeDomains = await LifeDomain.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        lifeDomains,
        pagination: {
            totalLifeDomains,
            totalPages,
            currentPage: page,
            limit,
        },
    };
}
