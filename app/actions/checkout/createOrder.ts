'use server';

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";

type CreateOrderInput = {
  name: string;
  userEmail: string;
  phone: string;
  city: string;
  streetAddress: string;
  subtotalPrice: number;
  deliveryFee: number;
  totalPrice: number;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export async function createOrder(order: CreateOrderInput) {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  try {
    const newOrder = await prisma.order.create({
      data: {
        paid: false,
        userEmail: order.userEmail,
        phone: order.phone,
        streetAddress: order.streetAddress,
        city: order.city,
        subtotalPrice: order.subtotalPrice,
        deliveryFee: order.deliveryFee,
        totalPrice: order.totalPrice,
        ...(userId && { User: { connect: { id: userId } } }), // Only connect user if logged in
        products: {
          create: order.products.map((product) => ({
            quantity: product.quantity,
            Product: {
              connect: { id: product.productId }
            },
            ...(userId && { User: { connect: { id: userId } } }), // Optional relation per product
          })),
        },
      },
    });

    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}
