"use client"

import { cartProps } from "@/app/lib/definitions";
import { addToCart } from "@/redux/cart/cartSlice"
import { useDispatch } from "react-redux"
import { useCallback, useTransition } from "react";
import { useSession } from "next-auth/react";
import { addToUserCart } from "@/app/actions/cart/user/updateCart";


const AddToCartBtn = ({productId, size, quantity}: cartProps) => {

    const {data: session} = useSession()
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    
    const handleAddToCart = useCallback(() => {
      dispatch(addToCart({ productId, size, quantity }))
      
      if (session) {
        startTransition(() => {
          addToUserCart({ productId, size, quantity });
        });
      }
    }, [productId, size, quantity, session, dispatch]);
    

  return (
    <button
    disabled={isPending}
    onClick={handleAddToCart}
    className="bg-black text-white cursor-pointer button-hover px-6 py-2">
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  )
}

export default AddToCartBtn