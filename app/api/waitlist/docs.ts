/**
 * ===========================
 * Waitlist API Documentation
 * ===========================
 */

/**
 * Payload for joining the waitlist.
 */
export interface WaitlistPayload {
    full_name: string;
    email: string;
    discovery_location?: "twitter" | "family_and_friends" | "telegram_bot" | "web" | "linkedin";
}
/**
 * Waitlist query params.
 */
export interface WaitlistFilterPayload {
    search?: string; // Search by full name or email
    discovery_location?: string; // Filter by discovery location
    startDate?: string; // Start date for createdAt filtering (ISO format)
    endDate?: string; // End date for createdAt filtering (ISO format)
}

  
/**
 * Structure of a waitlist entry.
 */
export interface WaitlistEntry {
    _id: string;
    full_name: string;
    email: string;
    discovery_location?: "twitter" | "family_and_friends" | "telegram_bot" | "web" | "linkedin";
    createdAt: string;
    updatedAt: string;
}


/**
 * Successful waitlist entry response.
 */
export interface JoinWaitlistSuccessResponse {
    message: string;
    entry: WaitlistEntry;
}
/**
 * Successful response structure for fetching waitlist entries.
 */
export interface ListWaitlistResponse {
    message: string;
    entries: WaitlistEntry[];
    pagination: {
      totalWaitlisters: number;
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

/**
 * Response type for the waitlist API.
 */
export type WaitlistResponse = JoinWaitlistSuccessResponse | ErrorResponse;

/**
 * Response type for fetching waitlist entries.
 */
export type GetWaitlistResponse = ListWaitlistResponse | ErrorResponse;


export const waitlistApiDocs = {
    joinWaitlist: {
        method: "POST",
        path: "/api/waitlist",
        description: "Adds a user to the waitlist.",
        requestBody: "WaitlistPayload",
        response: "WaitlistResponse",
    },
    getWaitlist: {
        method: "GET",
        path: "/api/waitlist",
        description:
          "Fetch all waitlist entries with optional filtering, search, and date range.",
        queryParams: {
          search:
            "string (optional) - Search by full name or email (case-insensitive).",
          discovery_location:
            "string (optional) - Filter waitlist entries by discovery location.",
          startDate:
            "string (optional) - Filter waitlist entries created after this date (ISO format).",
          endDate:
            "string (optional) - Filter waitlist entries created before this date (ISO format).",
        },
        response: "GetWaitlistResponse",
      },
};
