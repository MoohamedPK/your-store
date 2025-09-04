"use server";
import {prisma} from "@/app/lib/prisma";


export async function getOrder (orderId: string) {

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        address: true
                    }
                },
                products: {
                    include: {
                        Product : true
                    }
                }
            },
        })

        if (!order) throw new Error("Order not found")

        // handle the display name in case the user is guest 
        const orderWithDisplayName = {
            ...order, displayName: order.user?.name || order.userEmail.split("@")[0] || "Customer"
        }

        return orderWithDisplayName;

    } catch (error) {
        console.log(error);
    }
}