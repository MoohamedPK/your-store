"use client"
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";

const AddToCartBtn = ({id}: {id: string}) => {

  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    
    dispatch(addToCart(id))
  }
  return (
    <button onClick={handleAddToCart} className="bg-black text-white cursor-pointer button-hover px-6 py-2">Add to Cart</button>
  )
}

export default AddToCartBtn