'use server'

// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "@/app/lib/auth";
import {prisma} from "@/app/lib/prisma";
import { cartProps } from "@/app/lib/definitions";


export async function mergeCarts (guestItems: cartProps[]) {

    const session = await getAuthSession();

    if (!session?.user?.id) return {error: "Unauthenticated"};

    try {
        const userCart = await prisma.cart.findUnique({
            where: {
                userId : session.user.id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
    
        if (!userCart) return {error: "User cart not found"};
    
        for (const guestItem of guestItems) {
    
            const existingItem = userCart?.items.find((item) => item.productId === guestItem.productId && item.size === guestItem.size);
    
            if (existingItem) {
                await prisma.cartItem.update({where: {id : existingItem.id}, data: {
                    quantity: {increment: guestItem.quantity}
                }}
            )
            } else {
                await prisma.cartItem.create({
                    data: {
                        productId: guestItem.productId,
                        quantity: guestItem.quantity,
                        size: guestItem.size,
                        cartId: userCart.id
                    }
                })
            }
        }
    
        const mergedCart = await prisma.cart.findUnique({where: { userId: session.user.id}, include: {items: {include: {product: true}}}});
        return {message: "Cart merged successfully", cart: mergedCart};
        
    } catch (error) {
        console.log("Merge failed:", error);
        return {error: "Failed to merge carts"}
    }
} 