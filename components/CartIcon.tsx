"use client"
import { LucideShoppingBag } from "lucide-react";
import Link from "next/link";

export const CartIcon = () => {
    

    return (
        <Link href={"/cart"} className="cursor-pointer relative">
            <LucideShoppingBag/>

            {/* {totalQuantity > 0 && (
                <div className="absolute size-5 flex justify-center items-center bg-blue-900 rounded-full -top-2 -right-2 text-white/80 font-semibold">
                    <span className="">{totalQuantity}</span>
                </div>
            )} */}
        </Link>
    )
}