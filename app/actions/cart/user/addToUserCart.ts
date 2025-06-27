"use server";

import { getAuthSession } from "@/app/lib/auth";
import { cartProps } from "@/app/lib/definitions";
import { prisma } from "@/app/lib/prisma";

export async function addToUserCart(cartItems: cartProps): Promise<{
  success: boolean;
  message?: string;
  cartItem?: { id: string; quantity: number };
}> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return { success: false, message: "Not authenticated" };
    }

    // Input validation
    if (!cartItems.productId || !cartItems.size || cartItems.quantity <= 0) {
      return { success: false, message: "Invalid cart item data" };
    }

    // Transaction for atomic operations
    const result = await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.upsert({
        where: { userId: session.user.id },
        create: { userId: session.user.id },
        update: {},
        include: { items: true }
      });

      const existingItem = cart.items.find(
        item => item.productId === cartItems.productId && item.size === cartItems.size
      );

      if (existingItem) {
        const updatedItem = await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: cartItems.quantity } }
        });
        return { action: "updated", item: updatedItem };
      } else {
        const newItem = await tx.cartItem.create({
          data: {
            productId: cartItems.productId,
            size: cartItems.size,
            quantity: cartItems.quantity,
            cartId: cart.id
          }
        });
        return { action: "created", item: newItem };
      }
    });

    return {
      success: true,
      message: `Item ${result.action} in cart`,
      cartItem: { id: result.item.id, quantity: result.item.quantity }
    };

  } catch (error) {
    console.error('Cart update failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update cart"
    };
  }
}