import Goal from "@/models/goal";
import { connectToDB } from "@/services/db_mongo";


export async function fetchGoalsFromDB({
  owner,
  privacy,
  isAchieved,
  targetDate,
  startDate,
  endDate,
  page = 1,
  limit = 10
}: {
  owner?: string;
  privacy?: "public" | "private" | null;
  isAchieved?: boolean;
  targetDate?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) {
  await connectToDB();

  const filters: any = {};
  if (owner) filters.owner = owner;
  if (privacy) filters.privacy = privacy;
  if (typeof isAchieved === "boolean") filters.isAchieved = isAchieved;
  if (targetDate) filters.targetDate = new Date(targetDate);
  if (startDate && endDate) {
    filters.targetDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const totalGoals = await Goal.countDocuments(filters);
  const totalPages = Math.ceil(totalGoals / limit);

  const goals = await Goal.find(filters)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    goals,
    pagination: {
      totalGoals,
      totalPages,
      currentPage: page,
      limit,
    },
  };
}
