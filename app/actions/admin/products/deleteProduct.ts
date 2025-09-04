"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct (productId: string) {

    try {
        await prisma.$transaction([
          prisma.orderProduct.deleteMany({
            where: {
              productId
            }
          }),
          prisma.size.deleteMany({ where: { productId } }),
          prisma.product.delete({ where: { id: productId } }),
        ]);

        revalidatePath("/admin/products")
    
        return { success: true, message: "Product Deleted Successfully" };
      } catch (error) {
        console.log(error);
        return { success: false, message: "Cannot Delete Product" };
      }
}