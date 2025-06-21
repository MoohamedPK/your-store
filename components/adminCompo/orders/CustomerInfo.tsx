import { OrderWithDetails } from "@/app/lib/definitions"


const CustomerInfo = ({order}: {order: OrderWithDetails}) => {
  return (
    <div className="customerInfo">
        <div className="mb-8 font-semibold text-lg text-zinc-700"><h1>Customer Information</h1></div>

        <div className="orderSummary min-h-[250px] grid grid-cols-2 bg-black/23 p-4 rounded-lg">

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Customer Name</h3>
            <p className="text-zinc-800">{order.user?.name ? order.user.name : order.displayName }</p>
        </div> 

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Phone</h3>
            <p className="text-zinc-800">{order.phone}</p>
        </div> 

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Delivery Address</h3>
            <p className="text-zinc-800">{order.streetAddress}</p>
        </div> 

        <div className="space-y-2 font-semibold ">
            <h3 className="text-black/60 text-sm">Email</h3>
            <p className="text-zinc-800">{order.userEmail}</p>
        </div> 
        </div>
    </div>
  )
}

export default CustomerInfo