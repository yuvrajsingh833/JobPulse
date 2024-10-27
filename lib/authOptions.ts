import { NextAuthOptions, User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { backendBaseURL } from "@constants/constants";

interface ExtendedUser extends User {
  id: string;
  username: string;
  authToken?: string;
  first_name: string;
  last_name: string;
}

interface ExtendedJWT extends JWT {
  id: string;
  username: string;
  authToken?: string;
  first_name: string;
  last_name: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const fullName = user.name?.split(" ") ?? [];
        let first_name = "",
          last_name = "";
        if (fullName?.length > 1) {
          first_name = fullName[0];
          last_name = fullName.slice(1).join(" ");
        } else {
          first_name = user.name ?? "";
          last_name = "";
        }

        const response = await axios.post(
          `${backendBaseURL}/users/social_login/`,
          {
            email: user.email,
            username: user.email,
            first_name: first_name,
            last_name: last_name,
          }
        );

        const backendUser = response.data;

        (user as ExtendedUser).authToken = backendUser.token;
        (user as ExtendedUser).id = backendUser.user.id;
        (user as ExtendedUser).username = backendUser.user.username;
        user.email = backendUser.user.email;
        (user as ExtendedUser).first_name = backendUser.user.first_name;
        (user as ExtendedUser).last_name = backendUser.user.last_name;
        user.name =
          backendUser.user.first_name + " " + backendUser.user.last_name;
        return true;
      } catch (error) {
        console.error("Error during sign in", error);
        return false;
      }
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session?.user };
      }
      if (user) {
        token.id = (user as ExtendedUser).id;
        token.username = (user as ExtendedUser).username;
        token.email = user.email;
        token.name = user.name;
        token.first_name = (user as ExtendedUser).first_name;
        token.last_name = (user as ExtendedUser).last_name;
        token.authToken = (user as ExtendedUser).authToken;
      }

      return token;
    },
    session: async ({ session, token }) => {
      const extendedSession = session as ExtendedSession;
      extendedSession.user.id = (token as ExtendedJWT).id;
      extendedSession.user.username = (token as ExtendedJWT).username;
      extendedSession.user.email = token.email;
      extendedSession.user.first_name = (token as ExtendedJWT).first_name;
      extendedSession.user.last_name = (token as ExtendedJWT).last_name;
      extendedSession.user.name = token.name;
      extendedSession.user.authToken = (token as ExtendedJWT).authToken;
      return extendedSession;
    },
  },
};
