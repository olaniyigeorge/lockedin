/**
 * ===========================
 * Goal API Documentation
 * ===========================
 */

/**
 * Represents a goal in the db.
 */
export interface iGoal {
    _id: string;
    owner: string;
    name: string;
    description?: string;
    privacy: "public" | "private";
    targetDate: string;
    isAchieved: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Payload for updating a goal.
 */
export interface UpdateGoalPayload {
    name?: string;
    description?: string;
    privacy?: "public" | "private";
    targetDate?: string;
    isAchieved?: boolean;
}

/**
 * Response structure for a successful goal update.
 */
export interface UpdateGoalResponse {
    message: string;
}


/**
 * Response structure for retrieving a goal.
 */
export interface FetchGoalResponse {
    message: string;
    data: iGoal | null;
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
    error: string;
}

export type GetGoalResponse = FetchGoalResponse | ErrorResponse
/**
 * API documentation for the goals' endpoints.
 */
export const goalApiDocs = {
    getGoal: {
        method: "GET",
        path: "/api/goals/[id]",
        description: "Fetches a goal by ID along with its associated habit tasks.",
        response: "GetGoalResponse",
    },
    updateGoal: {
        method: "PATCH",
        path: "/api/goals/[id]",
        description: "Updates a goal by its ID.",
        requestBody: "UpdateGoalPayload",
        response: "UpdateGoalResponse | ErrorResponse",
    },
deleteGoal: {
    method: "DELETE",
    path: "/api/goals/[id]",
    description: "Deletes a goal by its ID.",
    response: "DeleteGoalResponse | ErrorResponse",
},
};