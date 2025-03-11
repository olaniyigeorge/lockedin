/**
 * ===========================
 * Users Interfaces
 * ===========================
 */

/**
 * Minimal user representation for public-facing components or frontend use.
 */
export interface IUser {
  /** User's email address */
  email: string;
  
  /** Optional display username */
  username?: string;
  
  /** Optional profile image URL or path */
  image?: string;
}

/**
 * Full user schema, typically used on the backend or admin-level systems.
 */
export interface iUser {
  /** Unique identifier for the user (MongoDB ObjectId) */
  _id: string;

  /** User's email address */
  email: string;

  /** User's hashed password */
  password: string;

  /** Optional display username */
  username?: string;

  /** Optional first name of the user */
  first_name?: string;

  /** Optional last name of the user */
  last_name?: string;

  /** Optional country of the user */
  country?: string;

  /** Role assigned to the user — can be 'admin', 'dev', or 'base' */
  role?: "admin" | "dev" | "base";

  /** Optional profile image URL or path */
  image?: string;

  /** Optional phone number of the user */
  phone_number?: string;

  /** Timestamp when the user was created */
  createdAt: string;

  /** Timestamp when the user was last updated */
  updatedAt: string;
}

/**
 * Represents an entry in the waitlist — typically used to collect early interest before product launch.
 */
export interface WaitlistEntry {
  /** Full name of the person joining the waitlist */
  full_name: string;

  /** Email address of the waitlist entrant */
  email: string;

  /** Where the user discovered the platform (e.g., Twitter, LinkedIn, etc.) */
  discovery_location: string;

  /** Unique identifier for the waitlist entry (MongoDB ObjectId) */
  _id: string;

  /** Timestamp when the waitlist entry was created */
  createdAt: string;

  /** Timestamp when the waitlist entry was last updated */
  updatedAt: string;

  /** Internal version key managed by MongoDB */
  __v: number;
}
