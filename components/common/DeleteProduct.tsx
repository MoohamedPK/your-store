"use client"

import { removeFromCart } from "@/redux/cart/cartSlice";
import { ProductSizes } from "@prisma/client";
import { Trash2 } from "lucide-react"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react";
import { deleteCartItem } from "@/app/actions/cart/user/deleteCartItem";

const DeleteProduct = ({productId, size, currentQuantity}: {productId: string, size:ProductSizes, currentQuantity: number}) => {

  const {data: session} = useSession();
  const dispatch = useDispatch();

  const handleDelete = async () => {

    if (session) {
      await deleteCartItem({productId, size})
    } else {
      dispatch(removeFromCart({productId, size, quantity : currentQuantity}))
    }
  }

  return (
      <button
      onClick={handleDelete}
      className="cursor-pointer text-red-500 button-hover">
        <Trash2 size={22}/>
      </button> 
  )
}

export default DeleteProduct