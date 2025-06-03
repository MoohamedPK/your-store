"use client"

import { updateQuantity } from "@/redux/cart/cartSlice";
import { ProductSizes } from "@prisma/client";
import { Minus, Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react";
import { updateUserCartQuantity } from "@/app/actions/cart/user/updateUserCartQuantity";

const QuantityController = ({currentQuantity, size, productId}: {currentQuantity: number, size:ProductSizes, productId:string}) => {

  const {data: session} = useSession();
  const dispatch = useDispatch();

  const handleChange = async (amount: number) => {

    if (session) {
      await updateUserCartQuantity({productId, size, quantity: amount})
    } else {
      dispatch(updateQuantity({productId, size, quantity: amount}))
    }
  }

  return (
    <div className="border border-black px-2 py-2 rounded-full">
      <div className="flex items-center justify-between">
        <button onClick={() => handleChange(1)} className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover">
          <Plus/>
        </button>

        <span className="font-semibold">{currentQuantity}</span>

        <button onClick={()=> handleChange(-1)} className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover">
          <Minus/>
        </button>
      </div>
    </div>
  )
}

export default QuantityController