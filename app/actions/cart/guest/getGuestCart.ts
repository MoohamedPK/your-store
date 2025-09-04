"use server";

import { cookies } from "next/headers";
import { cartProducts } from "@/server/db/products";
import { cartProps } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";


export async function getGuestCart() {
    const cookiesStore = await cookies();
    const guestCart = cookiesStore.get("guest_cart")?.value;
  
    if (!guestCart) return [];

    try {
      const parsedItems: cartProps[] = JSON.parse(guestCart);
      const products = await cartProducts(parsedItems.map(i => i.productId));
    
      const items = parsedItems.map((item) => {
        const product = products.find(p => p.id === item.productId);
  
        if (!product) return null;
    
        return {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: item.size,
          quantity: item.quantity,
          sizes: product.sizes
        };
      }).filter(Boolean);
      
      return items;

    } catch (error) {
      console.log(error);
    }
  
    revalidatePath("/cart")
  }