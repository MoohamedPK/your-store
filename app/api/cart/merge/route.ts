import { NextResponse } from "next/server";
import { mergeCarts } from "@/app/actions/cart/user/mergeCarts";


export async function POST (req: Request) {
    
    try {
        const body = await req.json();
        const guestItems = body.guestItems;

        const result = await mergeCarts(guestItems)

        console.log('result of mergin:', result);
        return NextResponse.json(result);
        
    } catch (error) {
        console.error("Merge cart API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}