/**
 * ===========================
 * User Authentication API Documentation
 * ===========================
 */

/**
 * Only email and password is required for authentication. 
 * User objects will be created with these (while the other fields are set to
 * their defaults) if a user with the email does not exist in the db.
 */
export interface AuthPayload {
    email: string;
    password: string;
 }
  

/**
 * User details returned in a successful authentication.
 */
export interface AuthenticatedUser {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    image: string;
    isVerified: Boolean;
    role: string   
}

  
/**
 * Successful authentication response.
 */
export interface AuthSuccessResponse {
    message: string;
    user: AuthenticatedUser;
}

/**
 * Error response structure.
 */
export interface ErrorResponse {
    error: string;
}
 
/**
 * Response type for the authentication endpoint.
 */
export type AuthResponse = AuthSuccessResponse | ErrorResponse;



/**
 * API Endpoints Documentation
 */
export const authApiDocs = {
    authenticate: {
      method: "POST",
      path: "/api/auth",
      description: "Authenticate a user and return session details.",
      requestBody: "AuthPayload",
      response: "AuthResponse",
    },
  };