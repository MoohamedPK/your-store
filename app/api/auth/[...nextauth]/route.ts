import NextAuth from "next-auth";
import {prisma} from "@/app/lib/prisma";
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

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({where: {email: credentials.email as string}});

                if (!user || !user?.password) return null;

                const isValide = await bcrypt.compare(credentials.password as string, user.password)

                if (!isValide) return {error: "User not Found"};

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
                token.id = user.id;
            }
            return token
        },

        async session ({session, token}){
            session.user.id = token.id as string;
            return session;
        },

        
    }
})

export const {GET, POST} = handlers