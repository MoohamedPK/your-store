"use server";

import { cookies } from "next/headers";
import { cartProducts } from "@/server/db/products";
import { cartProps } from "@/app/lib/definitions";


export async function getGuestCart () {

    const cookiesStore = await cookies();
    const guestCart = cookiesStore.get('guest_cart')?.value

    if (!guestCart) return {items: []} ;  

    const parsedItems: cartProps[] = JSON.parse(guestCart);
    const productsIds = parsedItems.map((item) => item.productId);
    const products = await cartProducts(productsIds)

    return {items: products}

}