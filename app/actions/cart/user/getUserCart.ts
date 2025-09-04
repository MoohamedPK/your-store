"use server" 

import {prisma} from "@/app/lib/prisma"
// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "@/app/lib/auth";

export async function getUserCart () {

    try {
    const session = await getAuthSession()
    const userId = session?.user.id

    if (!userId) return []

    const userCart = await prisma.cart.findUnique({
        where: {
            userId,
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            sizes: true,
                        }
                    }                    
                }
            }
        }
    })

    return (userCart?.items || []).map((item) => ({
        productId: item.productId,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
        sizes: item.product.sizes
    }));

    } catch (error) {
        console.log("error in getting user cart :", error);
        return []
    }
}