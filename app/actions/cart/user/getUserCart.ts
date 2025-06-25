"use server" 

import {prisma} from "@/app/lib/prisma"
// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "@/app/lib/auth";


export async function getUserCart () {

    const session = await getAuthSession()
    if (!session?.user?.id) return []; 

    const userCart = await prisma.cart.findUnique({
        where: {
            userId: session?.user.id
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
}