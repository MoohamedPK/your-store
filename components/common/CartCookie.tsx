"use client"

import { RootState } from "@/redux/store"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import Cookies from "js-cookie"


const CartCookie = () => {

    const cartItems = useSelector((state:RootState) => state.cart.items);

    useEffect(() => {
        if (cartItems.length > 0) {
            Cookies.set("guest_cart", JSON.stringify(cartItems), {
                expires: 7,
                path: "/"
            })
        } else {
            Cookies.remove("guest_cart", {path: "/"})
        }

    }, [cartItems])

  return null
}

export default CartCookie