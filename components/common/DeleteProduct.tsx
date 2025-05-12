"use client"
import { deleteCartItem } from "@/redux/cart/cartSlice"
import { useDispatch } from "react-redux"
import { Trash2 } from "lucide-react"

const DeleteProduct = ({id}: {id:string}) => {

  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(deleteCartItem(id))
  }

  return (
      <button onClick={handleDeleteItem} className="cursor-pointer text-red-500 button-hover">
        <Trash2 size={22}/>
      </button>
  )
}

export default DeleteProduct