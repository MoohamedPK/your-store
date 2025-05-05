"use client"
import { RootState } from "@/redux/store";
import { LucideShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
export const CartIcon = () => {

    const items = useSelector((state:RootState )=>  state.cart.items)
    const totalQuantity = Object.values(items).reduce((sum, quantity) => sum + quantity , 0)
    
    return (
        <Link href={"/cart"} className="cursor-pointer relative">
            <LucideShoppingBag/>

            {totalQuantity > 0 && (
                <div className="absolute size-5 flex justify-center items-center bg-blue-900 rounded-full -top-2 -right-2 text-white/80 font-semibold">
                    <span className="">{totalQuantity}</span>
                </div>
            )}
        </Link>
    )
}