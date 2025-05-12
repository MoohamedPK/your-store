import { prisma } from "@/lib/prisma";
import { caching } from "@/lib/caching";

export const allProducts = caching((category?: string) => {
  console.log('from caching',category)
    return prisma.product.findMany({
      where: category ? {
        Category :{
          name : category
        }
      } : undefined
    });

},
  ["all-porducts"], {revalidate: 3600})

export const featuredProducts =  caching(() => { 

    const featuredProducts = prisma.product.findMany({
      orderBy: {
        createdAt: "desc" // take the last created prods 
      },
      take: 3, // give me a limit of 5 prods
      
    });

    return featuredProducts
}, ["feat-products"], {revalidate: 3600})

export const productById = caching((id: string) => {
    return prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        sizes: true
      }
    }) 
}, ['productId'], {revalidate: 3600})


export const cartProducts = (ids: string[]) => {
  return prisma.product.findMany({
    where : {
      id: {
        in: ids
      }
    },
    include: {
      sizes: true,
      orders: true,
    }
  })
}