import NextAuth, { DefaultSession } from "next-auth";
import {prisma} from "@/lib/prisma";

// Extend the default Session and User types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
    }
}
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {type: 'email', label: "Email"},
                password: {type: "password", label: "Password"}
            },

            async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {

                if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
                    throw new Error("Missing credentials")
                } 

                const user = await prisma.user.findUnique({where: {email: credentials.email}});

                if (!user || !user?.password) throw new Error("Invalid Credentials");

                const isValide = await bcrypt.compare(credentials.password, user.password)

                if (!isValide) throw new Error("Invalid Credentials");

                const {id, name, email, password, image, role} = user;

                return {
                    id,
                    name,
                    email,
                    password,
                    role,
                    image,
                }
            }
        })
    ],

    session: {
        strategy: "jwt"
    },

    callbacks : {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role
            }
            return token
        },

        async session ({session, token}){
            session.user.id = token.id as string;
            session.user.role = token.role as string

            return session;
        }
    }
})