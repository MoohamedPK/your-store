"use server";

import {prisma} from "@/app/lib/prisma";
import { getAuthSession } from "@/app/lib/auth";

export async function clearUserCart(): Promise<{
    success: boolean;
    message: string;
}> {

    try {
        const session = await getAuthSession();
        if (!session?.user.id) return {success: false, message: "User Not Authenticated"};

        const userCart = await prisma.cart.findUnique({
            where: {
                userId: session.user.id
            },
            include: {
                items: true
            }
        })

        if (!userCart) return {success: false, message: "Cart Not Found"};

        if (userCart.items.length === 0) return {success: true, message: "Cart is Already Empty"};

        await prisma.cart.update({
            where: {
                userId: session.user.id
            },
            data: {
                items:{
                    deleteMany: {}
                }
            }
        })

        return {success: true, message: "Your Cart is Clear Now "};

    } catch (error) {
        console.log("error to clear user cart", error);
        return {success: false, message: error instanceof Error ? error.message : "An unexpected error occurred"};
    }
}