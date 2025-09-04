import { OrderWithDetails } from '@/app/lib/definitions'
import { currancyFormatter } from '@/app/lib/formatters'
import React from 'react'

const OrderSummary = ({order}: {order: OrderWithDetails}) => {
  return (
    <div className="orderSummary min-h-[250px] grid grid-cols-2 bg-black/23 p-4 rounded-lg">

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Order ID</h3>
            <p className="text-zinc-800">{order.id.slice(0,5)}*****</p>
        </div> 

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Order Total</h3>
            <p className="text-zinc-800">{currancyFormatter(order.totalPrice)}</p>
        </div> 

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Order Date</h3>
            <p className="text-zinc-800">{order.createdAt.toLocaleDateString()}</p>
        </div> 

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Order Status</h3>
            <p className={`w-fit px-3 text-xs py-1 ${order.status === "PENDING" ? "text-[#1A1A1D]" :
                order.status === "SHIPPED" ? "text-[#6A1E55]" :
                order.status === "DELIVERED" ? "text-[#A64D79]" :
                order.status === "CANCELLED" ? "text-[#2E073F]" :
                order.status === "PROCESSING" ? "text-[#3B1C32]" :
                "bg-red-500"}`}>{order.status}</p>
        </div> 
    </div>
  )
}

export default OrderSummary