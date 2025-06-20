import { Prisma, ProductSizes } from "@prisma/client"

export type cartProps = {
    productId: string
    quantity: number
    size: 'SMALL' | 'MEDIUM' | 'LARGE'
}

export type CartProductsType = Prisma.ProductGetPayload<{include: {sizes: true}}>
export type ProductsWithSizes = Prisma.ProductGetPayload<{include: {sizes: true, CartItem: true}}>
export type OrdersAndProducts = Prisma.OrderGetPayload<{include: {products: true}}>

export type NormalizedCartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: ProductSizes;
  quantity: number;
  sizes: { id: string; name: ProductSizes }[]; // for the dropdown
}

export type CreateOrderInput = {
  name: string;
  userEmail: string;
  phone: string;
  city: string;
  streetAddress: string;
  subtotalPrice: number;
  deliveryFee: number;
  totalPrice: number;
  products: {
    productId: string;
    quantity: number;
  }[];
};
