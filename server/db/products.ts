import {prisma} from "@/app/lib/prisma"
import { caching } from "@/app/lib/caching";

export const allProducts = caching((category?: string, query?: string) => {
  return prisma.product.findMany({
    where: {
      ...(category && {
        category: {
          name: category
        }
      }),
      ...(query && {
        name: {
          contains: query,
          mode: "insensitive" // Optional: makes it case-insensitive
        }
      })
    },
    include: {
      orders: true,
      sizes: true
    }
  });
}, ["all-products"], { revalidate: 3600 });

export const featuredProducts =  caching(() => { 

    const featuredProducts = prisma.product.findMany({
      orderBy: {
        createdAt: "desc" // take the last created prods 
      },
      take: 3,
      include: {
        orders: true,
        sizes: true
      } // give me a limit of 5 prods
      
    });

    return featuredProducts
}, ["feat-products"], {revalidate: 3600})

export const productById = caching((id: string) => {
    return prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        sizes: true,
        
      }
    }) 
}, ['productId'], {revalidate: 3600})


export const cartProducts = caching((ids: string[]) => {
    return prisma.product.findMany({
    where : {
      id: {
        in: ids
      }
    },
    include: {
      sizes: true,
      CartItem: true
      // orders: true
    }
  })
  
}, ['cart-products'], {revalidate: 60})