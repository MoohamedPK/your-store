"use server";

// import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getAuthSession } from "@/app/lib/auth";
import {prisma} from "@/app/lib/prisma";
import { ProductSizes } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteCartItem({productId, size}: {productId: string, size: ProductSizes}) {

    const session = await getAuthSession();

    if (!session?.user?.email) return {error: "Unauthenticated"};

    const cart = await prisma.cart.findUnique({where: {userId: session.user.id}, include: {items: true}});

    if (!cart) return {error: "cart not found"};

    const item = cart.items.find((item) => item.productId === productId && item.size === size);

    if(!item) return {error: "item not found"};

    await prisma.cartItem.delete({where: {id: item.id}});

    revalidatePath("/cart");
    return {success: true}; 
}