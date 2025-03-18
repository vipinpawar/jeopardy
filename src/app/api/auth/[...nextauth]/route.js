const NextAuth = require("next-auth").default; 
const GoogleProvider = require("next-auth/providers/google").default;
const CredentialsProvider = require("next-auth/providers/credentials").default; 
import prisma from "@/app/lib/prisma";
import { compare } from "bcrypt";


export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // this forces account selection
          access_type: "offline",    // optional: for refresh tokens
          response_type: "code",     // recommended for offline access
        },
      },
    }),
    

    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          console.log("No credentials provided.");
          return null;
        }

        const { email, password } = credentials;

        console.log("[Credentials Login Attempt]:", email);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("No user found with email:", email);
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          console.log("Invalid password for user:", email);
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        username: token.username,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
