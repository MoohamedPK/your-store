"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { cartProps } from "@/app/lib/definitions";
import {prisma} from "@/app/lib/prisma";


export async function addToUserCart (cartItems:cartProps) {

    const session = await auth();

    if (!session?.user.id) return {message: "Not Authenticated"};  
    
    try {
        
        const cart = await prisma.cart.upsert({
            where: {userId: session.user.id},
            create: {userId: session.user.id},
            update: {},
            include: {items: true}
        })

        const existingItem = cart?.items.find((item) => item.productId === cartItems.productId && item.size === cartItems.size);

        if (existingItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingItem.id
                },
                data: {
                    quantity: {increment : cartItems.quantity}
                }
            })
        } else {
            await prisma.cartItem.create({data: {
                productId: cartItems.productId,
                size: cartItems.size,
                quantity: cartItems.quantity,
                cartId: cart.id
            }})
        }

        console.log('product updated successfully')
        return {success: true}

    } catch (error) {
        console.error('cart update failed: ', error);
        return {message: "Failed to update cart"}
    }

}