"use server";

import { prisma } from "@/app/lib/prisma";

export async function getAllCategories () {

    try {
        await prisma.category.findMany();

        return {success: true}
    } catch (error) {
        return {success: false, message: error }
    }
}