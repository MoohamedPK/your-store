"use client"
import { useDispatch } from "react-redux"
import { addToCart, descreaseCartItems } from "@/redux/cart/cartSlice"
import { Minus, Plus } from "lucide-react"

const QuantityController = ({id, quantity}: {id:string, quantity: number}) => {
  const dispatch = useDispatch();
  const handeleDecreasing = () => {
      dispatch(descreaseCartItems({id, quantity}))
  }
  const handeleIncreasing = () => {
    dispatch(addToCart(id))
  }

  return (
    <div className="border border-black px-2 py-2 rounded-full">
      <div className="flex items-center justify-between">
        <button onClick={handeleIncreasing} className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover">
          <Plus/>
        </button>

        <span className="font-semibold">{quantity}</span>

        <button onClick={handeleDecreasing} className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover">
          <Minus/>
        </button>
      </div>
    </div>
  )
}

export default QuantityController