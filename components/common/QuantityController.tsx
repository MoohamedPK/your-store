"use client"

import { updateQuantity } from "@/redux/cart/cartSlice";
import { Minus, Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react";
<<<<<<< Updated upstream
import { updateUserCartQuantity } from "@/app/actions/cart/user/updateUserCartQuantity";
=======
>>>>>>> Stashed changes
import { cartProps } from "@/app/lib/definitions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const QuantityController = ({quantity, size, productId}: cartProps) => {

  const {data: session} = useSession();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleChange = async (amount: number) => {

    startTransition( async () => {
      if (session) {
        (await updateUserCartQuantity({productId, size, quantity: amount}))
      } else {
        dispatch(updateQuantity({productId, size, quantity: amount}))
<<<<<<< Updated upstream
        router.refresh()
=======
        
>>>>>>> Stashed changes
      }
    })
  }

  return (
    <div className="border border-black px-2 py-2 rounded-full">
      <div className="flex items-center justify-between">
        <button onClick={() => handleChange(1)} className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover" disabled={isPending}>
          <Plus/>
        </button>

        <span className="font-semibold">{quantity}</span>

        <button onClick={()=> handleChange(-1)} className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover" disabled={isPending}>
          <Minus/>
        </button>
      </div>
    </div>
  )
}

export default QuantityController