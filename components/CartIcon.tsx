"use client"
import { RootState } from "@/redux/store";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Ping from "./common/Ping";
import { NormalizedCartItem } from "@/app/lib/definitions";
import { Session } from "next-auth";

export const CartIcon = ({userCart, session}: {userCart: NormalizedCartItem[], session: Session | null}) => {
    
    const guestCart = useSelector((state:RootState) => state.cart.items);
    const cart = session?.user?.id ? userCart : guestCart

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Link href={"/cart"} className="cursor-pointer relative">
            <ShoppingBasket/>

            {totalQuantity > 0 && (
                <Ping/>
            )}
        </Link>
    )
}