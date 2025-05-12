import { NextRequest, NextResponse } from "next/server";
import { cartProducts } from "@/server/db/products";

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const products = await cartProducts(ids);

    return NextResponse.json({ message: "fetched successfully", data: products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}