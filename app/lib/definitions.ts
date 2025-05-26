import { Prisma } from "@prisma/client"

export type cartProps = {
    productId: string
    quantity: number
    size: 'SMALL' | 'MEDIUM' | 'LARGE'
}

export type CartProductsType = Prisma.ProductGetPayload<{include: {sizes: true,}}>