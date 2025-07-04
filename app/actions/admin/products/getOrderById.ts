"use server";

import { prisma } from "@/app/lib/prisma";

export async function getProductById(productId: string) {

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                sizes: true,
                
            }
        })

        return product;
    } catch (error) {
        console.error("Error fetching product:", error)
    }
}