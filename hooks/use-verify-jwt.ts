"use client";

import { useGlobalState } from "@/globalStore";
import { User } from "@/interface";
import * as jose from "jose";
import Cookies from "js-cookie";

export const useVerifyJWT = () => {
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  const setLoggedInUser = useGlobalState((state) => state.setLoggedInUser);
  const authToken = useGlobalState((state) => state.authToken);

  // console.log('Auth token: ', authToken);

  const verifyJWT = async (): Promise<User | null> => {
    try {
      if (!jwtSecret) {
        // console.log('Missing JWT secret.');
        return null;
      }

      if (!authToken) {
        // console.log('Missing auth token.');
        Cookies.remove("3wkAt");

        return null;
      } else {
        Cookies.set("3wkAt", authToken, { expires: 999 });
      }

      const encoder = new TextEncoder();
      const secretKey = encoder.encode(jwtSecret);

      const { payload } = await jose.jwtVerify(authToken, secretKey);

      // console.log('Logged in user: ', payload);

      const user: User = {
        _id: payload._id as string,
        email: payload.email as string,
        username: payload.username as string,
        image: payload.image as string,

        first_name: payload.first_name as string,
        last_name: payload.last_name as string,
        isVerified: payload.isVerified as boolean,
        role: payload.role as string,
      };

      setLoggedInUser(user);

      return user;
    } catch (error) {
      console.log("Token verification failed:", error);
      return null;
    }
  };

  return verifyJWT;
};
