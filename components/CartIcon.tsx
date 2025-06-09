"use client"
import { RootState } from "@/redux/store";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Ping from "./common/Ping";

export const CartIcon = () => {
    
    const cartItems = useSelector((state:RootState) => state.cart.items);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Link href={"/cart"} className="cursor-pointer relative">
            <ShoppingBasket/>

            {totalQuantity > 0 && (
                    <Ping/>
            )}
        </Link>
    )
}