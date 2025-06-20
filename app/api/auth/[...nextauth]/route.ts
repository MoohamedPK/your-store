import NextAuth from "next-auth";
import {prisma} from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { UserRole } from "@prisma/client";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: UserRole;
    image?: string | null;
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {type: 'email', label: "Email"},
                password: {type: "password", label: "Password"}
            },

            async authorize(credentials) {
                console.log(credentials);
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({where: {email: credentials.email as string}});

                if (!user || !user?.password) throw new Error("Incorrect username or password");

                const isValide = await bcrypt.compare(credentials.password as string, user.password)

                if (!isValide) throw new Error("Incorrect username or password")

                const {id, name, email, role, image} = user;

                return {
                    id,
                    name,
                    email,
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
                const typedUser = user as User;
                token.id = typedUser.id;
                token.role = typedUser.role;
                token.email = typedUser.email;
                token.name = typedUser.name || '';
            }
            return token;
        },

        async session({session, token}) {
            session.user.id = token.id as string;
            session.user.role = token.role;
            return session;
        },

        
    }
})


export const {GET, POST} = handlers