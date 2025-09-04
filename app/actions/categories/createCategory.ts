"use server";

import { prisma } from "@/app/lib/prisma";
import { slugify } from "@/app/lib/utils";
import { revalidatePath } from "next/cache";


export async function createCategory (name: string) {
    try {
        
        const slug  = slugify(name) 

        const existingCategory = await prisma.category.findUnique({
            where: {
                slug
            }
        })

        if (existingCategory) return { success: false, message: "Category already exists." };

        await prisma.category.create({
            data: {
                name,
                slug
            }
        })

        revalidatePath("/admin/categories")
        return {success: true, message: "Category Created Successfully"}
        
    } catch (error) {
        console.log(error)
        return { success: false, message: "Something went wrong while creating the category." };
    }
}