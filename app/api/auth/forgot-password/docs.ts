/**
 * ======================================
 * Forgot Password API Documentation
 * ======================================
 * @route POST /api/auth/forgot-password
 * @description This endpoint initiates a password reset by validating a user's email and first name.
 * If a matching user is found, an encrypted token is generated and appended to a redirect URL
 * pointing to the reset password page (`/reset-password?token=...`). This ensures the reset process
 * continues in the same browser session for a smoother user experience.
 */

/**
 * Request body structure for the forgot password endpoint.
 */
export interface ForgotPasswordPayload {
    email: string;
    first_name: string;
  }
  

/**
 * Auth-related API endpoints documentation.
 */
export const authApiDocs = {
forgotPassword: {
    method: "POST",
    path: "/api/auth/forgot-password",
    description:
    "Initiates a password reset by validating user's email and first name. If matched, user is redirected to `/reset-password?token=...` with a secure encrypted token.",
    requestBody: "ForgotPasswordPayload",
    response: "NextResponse<any>",
},
};
