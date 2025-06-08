"use server";

import { auth } from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/app/lib/prisma"
import { ProductSizes } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUserCartQuantity ({productId, size, quantity}: {productId:string, quantity:number, size:ProductSizes}) {

    const session = await auth();

    if (!session?.user?.email) return {error: "Unauthenticated"};

    const cart = await prisma.cart.findUnique({
        where: {userId: session.user.id},
        include: {items: true}
    })

    if (!cart) return {error: "Cart not Found"};

    const item = cart.items.find((item) => item.productId === productId && item.size === size);

    if (!item) return {error: "Item not found"};

    const newQuantity = item.quantity + quantity;

    if (newQuantity < 1) {
        await prisma.cartItem.delete({where: {id: item.id}});
    } else {
        await prisma.cartItem.update({where: {id: item.id}, data: {
            quantity: newQuantity
        }})
    }
    
    revalidatePath("/cart")
    return {success: true}
}