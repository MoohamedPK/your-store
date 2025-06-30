"use server";

import {prisma} from "@/app/lib/prisma";

export async function cancelOrder (orderId: string) {

    try {
        
        const order = await prisma.order.findUnique({where: {id: orderId}});

        if (!order) return {success: false, message : "Order not Found"};

        if (order.status === "SHIPPED" || order.status === "DELIVERED") return {success: false, message: "Order Cannot Canceled After Shipping"};

        await prisma.order.update({
            where: {id: orderId},
            data: {
                status: "CANCELLED",
                updatedAt: new Date()
            },
            include: {
                products:{
                    include: {
                        Product: true,
                    }
                }
            }
        })

        return {success: true, message: "Order cancelled successfully"}

    } catch (error) {

        return {success: false, message: error}
        
    }
} 