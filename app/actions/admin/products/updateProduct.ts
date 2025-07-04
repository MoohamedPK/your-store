"use server";

import { prisma } from "@/app/lib/prisma";
import { NewProductSchema } from "@/zod/newProduct";
import { ProductSizes } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateProduct(productId: string, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        sizes: Array.from(new Set(formData.getAll("sizes") as string[])), // 🧠 deduplicate here
        categoryId: formData.get("categoryId"),
        image: formData.get("image") || "",
        sortOrder: Number(formData.get("sortOrder")) || 0,
        stock: Number(formData.get("stock")) || 0,
      };
      

  const result = NewProductSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // ✅ 1. Update the product
      await tx.product.update({
        where: { id: productId },
        data: {
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          stock: result.data.stock,
          sortOrder: result.data.sortOrder,
          image: result.data.image,
          category: {
            connect: {
              id: result.data.categoryId,
            },
          },
        },
      });

      // ✅ 2. Delete old sizes before inserting new ones
      await tx.size.deleteMany({
        where: {
          productId,
        },
      });

      // ✅ 3. Add the new sizes
      await tx.size.createMany({
        data: result.data.sizes.map((size) => ({
          name: size as ProductSizes,
          productId,
        })),
      });
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Update error:", error);
    return {
      success: false,
      message: "Failed to update product. Please try again.",
    };
  }
}
