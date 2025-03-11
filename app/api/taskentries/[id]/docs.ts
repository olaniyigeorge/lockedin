/**
 * ===========================
 * Habit Task Entry API Documentation
 * ===========================
 * @description API documentation for the `/api/task-entries/[id]` route. 
 * This file defines the types and interfaces used for handling individual habit task entries
 * and their related entries.
 */

import { PublicUserInfo } from "../../habittasks/[id]/docs";




/**
 * An extended habit task entry object with prepopulated fields(owner).
 */
export interface eHabitTaskEntry {
    _id: string;
    owner: PublicUserInfo;
    habit_challenge?: string;
    habit: string;
    date: string;
    note?: string;
    status: "logged" | "in-review" | "completed";
    proof_link?: string;
    createdAt: string;
    updatedAt: string;
}

