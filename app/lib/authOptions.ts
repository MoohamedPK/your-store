import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions, SessionStrategy } from "next-auth";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (!user || !user.password) throw new Error("Invalid email or password");
  
          const isValid = await bcrypt.compare(credentials.password, user.password);
  
          if (!isValid) throw new Error("Invalid email or password");
  
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        },
      }),
    ],
    session: {
      strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          const typedUser = user as {
            id: string;
            name?: string;
            email: string;
            role: string;
            image?: string | null;
          };

          token.id = typedUser.id;
          token.role = typedUser.role as UserRole;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role;
        }
        return session;
      },
    },
    pages: {
      signIn: "/auth/signin", // optional: custom sign-in page route
    },
  };