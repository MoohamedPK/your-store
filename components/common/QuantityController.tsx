"use client"

import { Minus, Plus } from "lucide-react"

const QuantityController = () => {
    
  return (
    <div className="border border-black px-2 py-2 rounded-full">
      <div className="flex items-center justify-between">
        <button className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover">
          <Plus/>
        </button>

        <span className="font-semibold">1</span>

        <button className="bg-zinc-800 rounded-full text-white cursor-pointer button-hover">
          <Minus/>
        </button>
      </div>
    </div>
  )
}

export default QuantityController