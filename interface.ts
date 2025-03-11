/**
 * ======================================================
 *                  USERS INTERFACES
 * ======================================================
 */

/**
 * Minimal user representation for public-facing components or frontend use.
 */
export interface IUser {
  email: string;
  username?: string;
  image?: string;
}

/**
 * Full user schema, typically used on the backend or admin-level systems.
 */
export interface iUser {
  _id: string;
  email: string;
  password: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  role?: "admin" | "dev" | "base";
  image?: string;
  phone_number?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Extended user representation, typically used in responses.
 */
export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  image: string;
  isVerified: boolean;
  role: string;
}

/**
 * ======================================================
 *                  AUTH INTERFACES
 * ======================================================
 */


/**
 * Authentication response format after login or signup.
 */
export interface AuthResponse {
  message: string;
  user: User;
}

/**
 * ======================================================
 *                  WAITLISTS INTERFACES
 * ======================================================
 */

/**
 * Represents an entry in the waitlist — typically used to collect early interest before product launch.
 */
export interface WaitlistEntry {
  full_name: string;
  email: string;
  discovery_location: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/**
 * Input format when submitting a new waitlist entry.
 */
export interface WaitlistEntryInput {
  full_name: string;
  email: string;
  discovery_location: string;
}

/**
 * Response structure returned after a waitlist submission.
 */
export interface WaitlistResponse {
  message: string;
  entry: WaitlistEntry;
}
