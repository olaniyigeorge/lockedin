/**
 * ===========================
 * User API Documentation
 * ===========================
 */

/**
 * Represents a user in the system.
 */
export interface iUser {
  _id: string;
  email: string;
  username: string;
  first_name: string;

  last_name: string;

  /** Country of residence */
  country: string;

  /** User role within the system (admin, dev, or base) */
  role: "admin" | "dev" | "base";

  /** Optional profile image URL */
  image?: string;

  /** Optional phone number */
  phone_number?: string;

  /** Timestamp of when the user was created */
  createdAt: string;

  /** Timestamp of last update to the user */
  updatedAt: string;
}


/**
 * Payload for updating a user's details.
 */
export interface UpdateUserPayload {
  /** Updated username */
  username?: string;

  /** Updated email address */
  email?: string;

  /** Updated password */
  password?: string;

  /** Updated first name */
  first_name?: string;

  /** Updated last name */
  last_name?: string;

  /** Updated country */
  country?: string;

  /** Updated role (admin, dev, or base) */
  role?: "admin" | "dev" | "base";

  /** Updated profile image URL */
  image?: string;

  /** Updated phone number */
  phone_number?: string;
}

/**
 * Response structure for a successful user update.
 */
export interface UpdateUserResponse {
  /** Message indicating the update status */
  message: string;
}

/**
 * Response structure for a successful user deletion.
 */
export interface DeleteUserResponse {
  /** Message indicating the deletion status */
  message: string;
}

/**
 * Response structure for retrieving users.
 */
export interface GetUserResponse {
  message: string;
  /** Users object */
  data: iUser | null;
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
  /** Description of the error encountered */
  error: string;
}

/**
 * Response type for the GET /api/users endpoint.
 */
export type iGetUserResponse = GetUserResponse | ErrorResponse;

/**
 * API documentation for the users' endpoints.
 */
export const userApiDocs = {
  getUsers: {
    method: "GET",
    path: "/api/users/[id]",
    description: "Returns user details fetched by id",
    response: "iGetUserResponse",
  },
  updateUser: {
    method: "PATCH",
    path: "/api/users/[id]",
    description: "Update user details.",
    requestBody: "UpdateUserPayload",
    response: "UpdateUserResponse",
  },
  deleteUser: {
    method: "DELETE",
    path: "/api/users/[id]",
    description: "Delete a user by their ID.",
    response: "DeleteUserResponse",
  },
};



