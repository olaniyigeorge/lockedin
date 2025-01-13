import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

import { connectToDB } from "./db_mongo"
import User from "@/models/user"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({profile}) {
      try {
        console.log("....connecting to db")
        await connectToDB()

        // check if user exists
        const userExists = await User.findOne({
          email: profile?.email
        })

        // if not, create new user
        if (!userExists) {
          await User.create( {
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture
          })
        }

        return true
      } catch(error) {
        console.log(error)
        return false
      }
    },
    async session({session}) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      session.user.id = sessionUser._id.toString();

      return session
    }
  }
})


export const providers = [
  {
    id: "google",
    name: "Google",
  },
];