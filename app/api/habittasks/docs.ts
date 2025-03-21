/**
 * ===========================
 * Habit Tasks API Documentation
 * ===========================
 * @description API documentation for the `/api/habittasks` route. 
 * This file defines the types and interfaces used for handling habit tasks
 * and their related entries.
 */


/**
 * @interface iHabitTask
 * @description Defines the structure of a Habit Task.
 */
export interface iHabitTask {
    _id: string; 
    owner: string; 
    goal?: string; 
    aspect: string; 
    title: string; 
    description?: string;
    accessibility: "public" | "private" | "partnership"; 
    interval: number; 
    frequency: "daily" | "weekly" | "every_x_days" | "every_x_day_of_the_week"; 
    isActive: boolean; 
    start_date: Date; 
    end_date: Date; 
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * @interface iHabitTaskEntry
 * @description Defines the structure of a Habit Task Entry (logged completion).
 */
export interface iHabitTaskEntry {
    _id: string; 
    habit: string; 
    date: Date; 
    completed: boolean; 
}
/**
 * @interface HabitTaskFilter
 * @description Defines the filter parameters available for querying habit tasks.
 */
export interface HabitTaskFilter {
    owner?: string;
    goal?: string;
    aspect?: string;
    accessibility?: "public" | "private" | "partnership";
    isActive?: boolean;
    start_date?: { $gte: Date };
    end_date?: { $lte: Date };
    $or?: HabitTaskFilter[];
    $and?: HabitTaskFilter[];
  }

/**
 * @interface GetHabitTasksResponse
 * @description Response structure for fetching habit tasks.
 */
export interface FetchHabitTasksResponse {
    message: string;
    data: (iHabitTask & { entries: iHabitTaskEntry[] })[]; // Array of habit tasks with their respective entries
    pagination: {
        totalHabitTasks: number;
        totalPages: number;
        currentPage: number;
        limit: number;
      };
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
    error: string;
}
export type GetHabitTasksResponse = FetchHabitTasksResponse | ErrorResponse

/**
 * @interface PostHabitTaskRequest
 * @description Request payload structure for creating a new habit task.
 */
export interface PostHabitTaskRequest {
    owner: string; 
    goal?: string; 
    aspect: string; 
    title: string; 
    description?: string;
    accessibility: "public" | "private" | "partnership"; 
    interval: number; 
    frequency: "daily" | "weekly" | "every_x_days" | "every_x_day_of_the_week"; // Frequency pattern
    isActive: boolean; 
    start_date: string; 
    end_date: string; 
}

/**
 * @interface PostHabitTaskResponse
 * @description Response structure for creating a habit task.
 */
export interface PostHabitTaskResponse {
    message: string; 
    data: iHabitTask | null; 
}
