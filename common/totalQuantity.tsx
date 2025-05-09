"use client"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store";

const useQuantity = () => {
    const items = useSelector((state:RootState )=>  state.cart.items)
    const totalQuantity = Object.values(items).reduce((sum, quantity) => sum + quantity , 0)
  return {totalQuantity}
}

export default useQuantity