import { Prisma } from "@prisma/client"

export type cartProps = {
    items: {[key: string]: number},
}

export type CartProductsType = Prisma.ProductGetPayload<{include: {sizes: true, orders: true}}>