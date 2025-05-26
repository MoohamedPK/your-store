import { cartProps } from "@/app/lib/definitions";
import { cookies } from "next/headers";


export async function setCookie (itemsId: cartProps) {

    const cookieStore = await cookies();

    cookieStore.set("cart", JSON.stringify(itemsId), {
        expires: Date.now() + 1,
        path: "/",
        httpOnly: false,
    })
}