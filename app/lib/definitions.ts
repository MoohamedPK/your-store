import { Prisma } from "@prisma/client"

export type cartProps = {
    productId: string
    quantity: number
    size: 'SMALL' | 'MEDIUM' | 'LARGE'
}

export type CartProductsType = Prisma.ProductGetPayload<{include: {sizes: true, orders: true}}>
export type ProductsWithSizes = Prisma.ProductGetPayload<{include: {sizes: true, CartItem: true}}>