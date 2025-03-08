/**
 * ===========================
 * Users API Documentation
 * ===========================
 */

/**
 * Payload for creating a new user.
 */
export interface CreateUserPayload {
  // essentials
  email: string;
  password: string;

  // optionals
  username?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  role?: string;
  image?: string;
  phone_number?: string;
}

/**
 * Whole User 
 */
export interface iUser {
  _id: string;
  email: string;
  password: string;

  username?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  role?: "admin" | "dev" | 'base';
  image?: string;
  phone_number?: string;

  createdAt: string;
  updatedAt: string;
}








/**
 * Successful user creation response.
 */
export interface UserCreationSuccessResponse {
    message: string;
    user: iUser;
}

/**
 * Successful get users response
*/
export interface GetUsersSuccesfulResponse {
  message: string;
  users?: iUser[];
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
    error: string;
}
 
/**
 * Response type for the POST endpoint.
 */
export type CreateUserResponse = UserCreationSuccessResponse | ErrorResponse;


/**
 * Response type for the GET endpoint.
 */
export type GetUsersResponse = GetUsersSuccesfulResponse | ErrorResponse;



export const usersApiDocs = {
  getUsers: {
    method: "GET",
    path: "/api/users",
    description: "Fetch all users with optional filtering and search.",
    queryParams: {
      search: "string (optional) - Search by username, email, first name, last name, or phone number.",
      role: "string (optional) - Filter by user role.",
      country: "string (optional) - Filter by country.",
      firstLetter: "string (optional) - Filter users whose first name starts with this letter.",
    },
    response: "GetUsersResponse",
  },
  createUser: {
    method: "POST",
    path: "/api/users",
    description: "Create a new user.",
    requestBody: "CreateUserPayload",
    response: "CreateUserResponse",
  },
};
