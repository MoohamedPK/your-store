"use client"

import { Trash2 } from "lucide-react"

const DeleteProduct = () => {

  return (
      <button className="cursor-pointer text-red-500 button-hover">
        <Trash2 size={22}/>
      </button> 
  )
}

export default DeleteProduct