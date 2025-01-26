import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // Check if profile is defined
        if (!profile || !profile.email) {
            console.error('No profile or email found');
            return false;
            }

        // // check if user already exists
        // const userExists = await User.findOne({ email: profile?.email });

        // // if not, create a new document and save user in MongoDB
        // if (!userExists) {
        //     const username = profile.name?.replace(" ", "").toLowerCase() || "user"; // Fallback if name is undefined
        //   await User.create({
        //     email: profile?.email,
        //     username: username,
        //     image: profile?.picture || "",
        //   });
        // }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }

