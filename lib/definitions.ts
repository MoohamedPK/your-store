import { Product } from "@prisma/client"

export type cartProps = {
    items: {[key: number]: number},
    productInfo: Product[]
}