/**
 * ===========================
 * User Password Reset API Documentation
 * ===========================
 * @description This endpoint (/api/reset-password) lets a user reset their 
 * password using a token included in the request body. The token contains 
 * encrypted user data and is valid for a short period (3 minutes). If valid, 
 * the password is updated and the user is redirected to the login page. 
 * If invalid or expired, an error is returned.
 */


/**
 * Request body for password reset.
 * The `token` is a time-sensitive encrypted string containing the user's info.
 */
export interface ResetPasswordPayload {
    password: string;
    token: string;
}

/**
 * Response returned on successful password reset.
 * A redirect to the login page is expected.
 */
export interface ResetPasswordSuccessResponse {
message: string;
redirect: string;
}

/**
 * Error response structure for failed password reset attempts.
 */
export interface ResetPasswordErrorResponse {
error: string;
}

/**
 * Response type for the reset password endpoint.
 */
export type ResetPasswordResponse = ResetPasswordSuccessResponse | ResetPasswordErrorResponse;

/**
 * API Endpoints Documentation
 */
export const authApiDocs = {
resetPassword: {
    method: "POST",
    path: "/api/auth/reset-password",
    description:
    "Resets a user's password using a token from a password reset request. The token contains encrypted user data and has a validity period (default: 3 minutes). On success, the user is redirected to the sign-in page.",
    requestBody: "ResetPasswordPayload",
    response: "ResetPasswordResponse",
},
};
