"use server";

import {prisma} from "@/app/lib/prisma"

export async function getActiveUsers () {

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)

    try {
        const activeUsers = await prisma.user.findMany({
            where: {
                
                orders: {
                some: {
                    createdAt: {
                        gte: twoMonthsAgo
                    }
                }
            },
        },
        include: {
            orders: {
                where: {
                    createdAt: {
                        gte: twoMonthsAgo
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            },
            
        }
        })
        return activeUsers;
        
    } catch (error) {
        return {success: false, message: error}
    }

}