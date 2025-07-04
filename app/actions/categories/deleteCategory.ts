"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCategory (categoryId: string) {

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Set categoryId to null on all related products
            await tx.product.updateMany({
            where: { categoryId },
            data: {
                categoryId: null
            }
            });
    
            // 2. Delete the category
            await tx.category.delete({
            where: { id: categoryId },
            });
        });
        revalidatePath("/admin/categories")        
        return {success: true, message: "Category Deleted Successfully"};

    } catch (error) {
        console.log(error);

        return {success: false, message: "Cannot Delete Category"};

    }
} 