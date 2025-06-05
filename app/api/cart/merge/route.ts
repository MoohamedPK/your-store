import { NextResponse } from "next/server";
import { mergeCarts } from "@/app/actions/cart/user/mergeCarts";


export async function POST (req: Request) {
    
    try {
        const body = await req.json();
        const guestItems = body.guestItems;

        const result = await mergeCarts(guestItems)

        return NextResponse.json(result);
        
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}