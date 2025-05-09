import {NextResponse} from "next/server"
import { cartProducts } from "@/server/db/products"


export async function POST(req: Request) {
    const {ids} = await req.json();
    
    if (!Array.isArray(ids)) {
        return NextResponse.json({error: "Invalid request"}, {status: 400});
    }

    const products = await cartProducts(ids)
    return NextResponse.json(products);
}