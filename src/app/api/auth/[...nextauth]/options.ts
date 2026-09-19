import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Missing email/username or password");
        }

        await dbConnect();

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        const user = await UserModel.findOne({
          $or: [
            { email: identifier },
            { username: identifier },
          ],
        });

        if (!user?.password) {
          throw new Error("Invalid credentials");
        }

        if (!user.isVerified) {
          throw new Error(
            "Please verify your account before logging in"
          );
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessage,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages =
          token.isAcceptingMessages as boolean;
        session.user.username = token.username as string;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/sign-in",
  },
});