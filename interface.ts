export interface IUser {
  email: string;
  username?: string;
  image?: string;
}

export interface WaitlistEntry {
  full_name: string;
  email: string;
  discovery_location: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WaitlistResponse {
  message: string;
  entry: WaitlistEntry;
}

export interface WaitlistEntryInput {
  full_name: string;
  email: string;
  discovery_location: string;
}
