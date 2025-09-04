"use server";

import { prisma } from "@/app/lib/prisma";

export async function getRecentlyProducts () {

    return await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5
    })

}