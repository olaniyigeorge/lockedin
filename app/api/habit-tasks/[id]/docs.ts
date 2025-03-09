/**
 * ===========================
 * Habit Task API Documentation
 * ===========================
 * @description API documentation for the `/api/habit-tasks/[id]` route.
 * This file defines the types and interfaces used for handling individual habit tasks
 * and their associated entries.
 */

/**
 * Represents a single habit task entry log.
 */
export interface iHabitTaskEntry {
    _id: string;
    habit: string;
    value: string;
    evidence_link?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents the public exposable info on a user object.
 */
export interface PublicUserInfo {
    _id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
 }


/**
 * Represents an extended habit task in the db prepopulated with the user(owner) object.
 */
export interface eHabitTask {
    _id: string;
    title: string;
    description: string;
    aspect: string;
    accessibility: string;
    frequency: string;
    interval: string;
    isActive: boolean;
    start_date?: string;
    end_date?: string;
    owner: PublicUserInfo;
    createdAt: string;
    updatedAt: string;
}

/**
 * Extended habit task object including its entries.
 */
export interface HabitTaskWithEntries extends eHabitTask {
    entries: iHabitTaskEntry[];
}

/**
 * Payload for updating a habit task.
 */
export interface UpdateHabitTaskPayload {
    title?: string;
    description?: string;
    aspect?: string;
    accessibility?: string;
    frequency?: string;
    interval?: string;
    isActive?: boolean;
    start_date?: string;
    end_date?: string;
}

/**
 * Response structure for a successful habit task fetch.
 */
export interface GetHabitTaskResponseSuccess {
    message: string;
    data: HabitTaskWithEntries;
}

/**
 * Response structure for a failed attempt to fetch a habit task.
 */
export interface GetHabitTaskResponseError {
    message: string;
    data: null;
}

/**
 * Response structure for a successful update.
 */
export interface UpdateHabitTaskResponse {
message: string;
}

/**
 * Response structure for a successful deletion.
 */
export interface DeleteHabitTaskResponse {
message: string;
}

/**
 * Response structure for API error responses.
 */
export interface ErrorResponse {
error: string;
}


/**
 * API response type for GET habit task by ID.
 */
export type iGetHabitTaskResponse = 
    | GetHabitTaskResponseSuccess 
    | GetHabitTaskResponseError 
    | ErrorResponse;


/**
 * API response type for PATCH habit task by ID.
 */
export type iUpdateHabitTaskResponse = UpdateHabitTaskResponse | ErrorResponse;

/**
 * API response type for DELETE habit task by ID.
 */
export type iDeleteHabitTaskResponse = DeleteHabitTaskResponse | ErrorResponse;






/**
 * API documentation for the habit task endpoints.
 */
export const habitTaskApiDocs = {
getHabitTaskById: {
    method: "GET",
    path: "/api/habit-tasks/[id]",
    description: "Returns a specific habit task along with its entries, fetched by ID.",
    response: "iGetHabitTaskResponse",
},
updateHabitTask: {
    method: "PATCH",
    path: "/api/habit-tasks/[id]",
    description: "Update a specific habit task (only allowed if user is the task owner).",
    requestBody: "UpdateHabitTaskPayload",
    response: "iUpdateHabitTaskResponse",
},
deleteHabitTask: {
    method: "DELETE",
    path: "/api/habit-tasks/[id]",
    description: "Delete a specific habit task (only allowed if user is the task owner).",
    response: "iDeleteHabitTaskResponse",
},
};
