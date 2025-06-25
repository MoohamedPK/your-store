import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export function getAuthSession () {
    return getServerSession(authOptions)
}