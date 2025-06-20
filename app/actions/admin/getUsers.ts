"use server";

import {prisma} from "@/app/lib/prisma";


export async function getAllUsers () {

    try {
        const allUsers = await prisma.user.findMany({});

        return allUsers;
    } catch (error) {
        console.log(error);
    }
}