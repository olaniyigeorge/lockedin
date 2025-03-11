/**
 * ===========================
 * Habit Task Entries API Documentation
 * ===========================
 * @description API documentation for the `/api/task-entries/` route. 
 * This file defines the types and interfaces used for handling habit task entries
 * and their related entries.
 */


/**
 * Payload for creating a new habit task entry.
 */
export interface CreateHabitTaskEntryInput {
owner?: string; // Optional if derived from session
habit_challenge?: string;
habit: string;
date: string; // ISO format
note?: string;
status?: "logged" | "in-review" | "completed";
proof_link?: string;
}

/**
 * A habit task entry object.
 */
export interface iHabitTaskEntry {
    _id: string;
    owner: string;
    habit_challenge?: string;
    habit: string;
    date: string;
    note?: string;
    status: "logged" | "in-review" | "completed";
    proof_link?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Successful creation response.
 */
export interface HabitTaskEntryCreationSuccess {
    message: string;
    data: iHabitTaskEntry;
}

/**
 * Successful fetch response.
 */

export interface HabitTaskEntriesFetchSuccess {
    message: string;
    data: iHabitTaskEntry[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
    error: string;
    message?: string;
}

/**
 * Response type for the POST endpoint.
 */
export type CreateHabitTaskEntryResponse = HabitTaskEntryCreationSuccess | ErrorResponse;

/**
 * Input filters for GET endpoint.
 */
export interface GetHabitTaskEntriesInput {
    owner?: string;
    habit?: string;
    habit_challenge?: string;
    status?: "logged" | "in-review" | "completed";
    startDate?: string;
    endDate?: string;  
}

/**
 * Response type for the GET endpoint.
 */
export type GetHabitTaskEntriesResponse = HabitTaskEntriesFetchSuccess | ErrorResponse;

/**
 * API Endpoint Documentation Metadata
 */
export const habitTaskEntriesApiDocs = {
createHabitTaskEntry: {
    method: "POST",
    path: "/api/habit-task-entries",
    description: "Create a new habit task entry for a given task (and optionally challenge).",
    requestBody: "CreateHabitTaskEntryInput",
    response: "CreateHabitTaskEntryResponse",
},
getHabitTaskEntries: {
    method: "GET",
    path: "/api/habit-task-entries",
    description: "Retrieve habit task entries based on filters like owner, habit, challenge, status, and date range.",
    queryParams: {
    owner: "string (optional) - ID of the owner (user)",
    habit: "string (optional) - ID of the habit task",
    habit_challenge: "string (optional) - ID of the habit challenge",
    status: `"logged" | "in-review" | "completed" (optional) - Status of entry`,
    startDate: "string (optional) - Filter entries created after this date (ISO)",
    endDate: "string (optional) - Filter entries created before this date (ISO)",
    },
    response: "GetHabitTaskEntriesResponse",
},
};
