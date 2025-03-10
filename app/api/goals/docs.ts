/**
 * ===========================
 * Goals API Documentation
 * ===========================
 */


/**
 * Query parameters for fetching goals.
 */
export interface GetGoalsQuery {
  owner?: string;
  privacy?: "public" | "private";
  isAchieved?: boolean;
  targetDate?: string; // Single date or range
  startDate?: string; // For range filtering
  endDate?: string;   // For range filtering
}


/**
 * Payload for creating a new goal.
 */
export interface CreateGoalPayload {
    owner: string;
    name: string;
    description?: string;
    privacy?: "public" | "private";
    isAchieved?: boolean;
    targetDate: string; // ISO Date format
}

/**
 * Successful goal creation response.
 */
export interface GoalCreationSuccessResponse {
    message: string;
    data: iGoal;
}
/**
 * Successful goal retrieval response.
 */
export interface GetGoalsSuccessResponse {
    message: string;
    data: iGoal[];
    pagination: {
        totalGoals: number;
        totalPages: number;
        currentPage: number;
        limit: number;
      };
}
/**
 * Goal object type.
 */
export interface iGoal {
    _id: string;
    owner: string;
    name: string;
    description?: string;
    privacy: "public" | "private";
    isAchieved: boolean;
    targetDate: string; // ISO Date format
    createdAt: string;
    updatedAt: string;
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
    error: any;
}

/**
 * Response type for the POST endpoint.
 */
export type CreateGoalResponse = GoalCreationSuccessResponse | ErrorResponse;

/**
 * Response type for the GET endpoint.
 */
export type GetGoalsResponse = GetGoalsSuccessResponse | ErrorResponse;
  





export const goalsApiDocs = {
    createGoal: {
        method: "POST",
        path: "/api/goals",
        description: "Create a new goal.",
        requestBody: "CreateGoalPayload",
        response: "CreateGoalResponse",
    },
    getGoals: {
        method: "GET",
        path: "/api/goals",
        description: "Fetch goals with optional filtering.",
        queryParams: {
            owner: "string (optional) - Filter by owner ID.",
            privacy: '"public" | "private" (optional) - Filter by goal privacy.',
            isAchieved: "boolean (optional) - Filter by completion status.",
            targetDate: "string (optional) - Filter by exact target date.",
            startDate: "string (optional) - Start of target date range (ISO format).",
            endDate: "string (optional) - End of target date range (ISO format).",
        },
        response: "GetGoalsResponse",
    },
};
