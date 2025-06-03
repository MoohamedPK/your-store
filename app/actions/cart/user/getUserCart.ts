"use server" 

import {prisma} from "@/app/lib/prisma"
import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function getUserCart () {

    const session = await auth()
    if (!session?.user.id) return []; 

    const userCart = await prisma.cart.findUnique({
        where: {
            userId: session?.user.id
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            sizes: true
                        }
                    }                    
                }
            }
        }
    })

    return userCart?.items || [];
}