"use client"
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";

const AddToCartBtn = ({id}: {id: number}) => {

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(id))
  }
  return (
    <Button onClick={handleAddToCart} className="bg-black text-white cursor-pointer button-hover w-full">Add to Cart</Button>
  )
}

export default AddToCartBtn