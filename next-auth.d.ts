import NextAuth, {DefaultSession} from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

export module "next-auth" {
    interface Session {
        user : {
            id: string,
            name: string,
            image?: string,
            role: UserRole,
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        name: string,
        image? : string,
        role: UserRole
    }
}