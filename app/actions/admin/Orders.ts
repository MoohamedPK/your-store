"use server";

import {prisma} from "@/app/lib/prisma";

export async function fetchOrders () {

    try {
        
        const orders = await prisma.order.findMany({
            orderBy: {createdAt: "desc"},
            include: {
                products: {
                    include: {
                        Product: true
                    }
                }
            }
        })

        return orders;

    } catch (error) {
        console.log(error);
        return {success: true, message : error}
    }
}