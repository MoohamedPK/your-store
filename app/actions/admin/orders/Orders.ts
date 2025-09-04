"use server";

import {prisma} from "@/app/lib/prisma";

export async function fetchOrders () {

    try {
        
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        Product: true
                    }
                },
            },
            orderBy: {createdAt: "desc"},
        }
    )

        return orders;

    } catch (error) {
        console.log(error);
        return [];
    }
}