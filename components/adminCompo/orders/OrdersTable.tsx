import { fetchOrders } from "@/app/actions/admin/Orders"
import { OrdersAndProducts } from "@/app/lib/definitions"
import { currancyFormatter } from "@/app/lib/formatters";
import Link from "next/link"
import OrdersSearch from "./OrdersSearch";

const OrdersTable = async () => {

    const orders = await fetchOrders() as OrdersAndProducts[];

  return (
    <main>
        <h1 className="text-lg font-semibold mb-4">Recent Orders</h1>

        <div className="border-2 border-black/30 rounded-lg p-7">
            <div>
                {/* SEARCH ORDERS */}
                <OrdersSearch/>
            </div>

            <table className="w-full text-left border-separate border-spacing-4">
            <thead>
            <tr className="text-sm text-zinc-800 border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">City</th>
                <th className="pb-2">Phone</th>
                <th className="pb-2">Address</th>
                <th className="pb-2">Subtotal</th>
                <th className="pb-2">Delivery Fee</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
            </tr>
            </thead>
            <tbody className="">
            {orders.map((order, index) => (
                <tr key={order.id} className="border-b text-sm font-semibold text-zinc-700">
                <td className="py-2">Order {index + 1}</td>
                <td>{order.userEmail}</td>
                <td>{order.city}</td>
                <td>{order.phone}</td>
                <td>{order.streetAddress}</td>
                <td>{currancyFormatter(order.subtotalPrice)}</td>
                <td>{currancyFormatter(order.deliveryFee)}</td>
                <td>{currancyFormatter(order.totalPrice)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                    <span
                    className={`px-2 py-1 rounded text-white text-xs font-medium ${
                        order.status === "PENDING" ? "bg-[#1A1A1D]" :
                        order.status === "SHIPPED" ? "bg-[#6A1E55]" :
                        order.status === "DELIVERED" ? "bg-[#A64D79]" :
                        order.status === "CANCELLED" ? "bg-[#2E073F]" :
                        order.status === "PROCESSING" ? "bg-[#3B1C32]" :
                        "bg-red-500"
                    }`}
                    >
                    {order.status}
                    </span>
                </td>
                <td>
                    <Link href={`/admin/orders/${order.id}`}>
                    <span className="text-blue-500 hover:underline">View</span>
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </main>
  )
}

export default OrdersTable