"use server";

import { prisma } from "@/app/lib/prisma";
import { NewProductSchema } from "@/zod/newProduct";
import { ProductSizes } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createNewProduct(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    sizes: formData.getAll("sizes") as string[],
    categoryId: formData.get("categoryId"),
    image: formData.get("image") || "",
    sortOrder: Number(formData.get("sortOrder")) || 0,
    stock: Number(formData.get("stock")) || 0
  };

  const result = NewProductSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed"
    };
  }

  console.log("adding prod to db ...")

  try {
    await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          stock: result.data.stock,
          sortOrder: result.data.sortOrder,
          image: result.data.image,
          category: {
            connect: {
              id: result.data.categoryId
            }
          }
        }
      });

      await tx.size.createMany({
        data: result.data.sizes.map((size) => ({
          name: size as ProductSizes,
          productId: product.id
        }))
      });
    });


    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "Failed to create product. Please try again."
    };
  }
}