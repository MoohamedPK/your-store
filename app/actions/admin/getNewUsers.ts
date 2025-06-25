"use server";

import {prisma} from "@/app/lib/prisma";

export async function getNewUsers () {

    const lastTwoWeeks = new Date();
    lastTwoWeeks.setDate(lastTwoWeeks.getDate() - 14 );

    try {
        
        const newUsers = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: lastTwoWeeks
                }
            },
        })

        return newUsers;

    } catch (error) {
        console.log(error)
        return {success: false, message: error}
    }
}