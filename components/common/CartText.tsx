"use client"
import useQuantity from "@/components/common/totalQuantity"
const CartText = () => {

    const {totalQuantity} = useQuantity()

  return (
    <div className="text-center mt-32 text-xl font-semibold">
        {!totalQuantity && (
            <p>Your cart is empty</p>
        ) }
    </div>
  )
}

export default CartText