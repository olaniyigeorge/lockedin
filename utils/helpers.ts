import { clsx, type ClassValue } from "clsx"
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge"
import { SignJWT, jwtVerify } from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type iSession = {
  expires: string,
  user: {
    email: string,
    username: string,
    role: string,
    id: string
  },
  iat: number,
  exp: number
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  }).format(new Date(date));
};

export const getDaysInRange = (startDate: Date, endDate: Date) => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};



// Auth Helpers
const encryptionKey = process.env.ENCRYPTION_KEY as string;
const key = new TextEncoder().encode(encryptionKey);

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  if (request.cookies.has("session")) {
    const sessionCookie = `${request.cookies.get("session")?.value}`;
    const decryptedSession = await decrypt(sessionCookie);
    
    if (decryptedSession.expires && new Date(decryptedSession.expires) > new Date()) {
      return true;
    }
  }

  return false;
}


export async function getSessionData(request: NextRequest): Promise<iSession | null> {
  if (request.cookies.has("session")) {
    const sessionCookie = `${request.cookies.get("session")?.value}`;
    const decryptedSession = await decrypt(sessionCookie);
    
    return decryptedSession
  }

  return null
}



export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('3h')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, { 
    algorithms: ['HS256'] })
  
  return payload;
}