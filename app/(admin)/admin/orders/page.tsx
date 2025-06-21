import { fetchOrders } from "@/app/actions/admin/Orders"
import { OrdersAndProducts } from "@/app/lib/definitions";
import { groupOrdersByStatus, groupRevenueByMonth } from "@/app/lib/utils";
import MonthlyRevenueChart from "@/components/adminCompo/orders/charts/MonthlyRevenueChart";
import OrdersStatusChart from "@/components/adminCompo/orders/charts/OrdersStatusChart";
import DashBoardCard from "@/components/adminCompo/orders/DashBoardCard";
import OrdersTable from "@/components/adminCompo/orders/OrdersTable";
import { BoxIcon, DollarSign, ShoppingCart, Truck } from "lucide-react";

const OrdersPage = async () => {

  const orders = await fetchOrders() as OrdersAndProducts[];
  
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "PENDING").length;
  const shippedOrders = orders.filter((order) => order.status === "SHIPPED").length;
  const deliveredOrdersRevenue = orders.filter((order) => order.status === "DELIVERED").reduce((acc, order) => {
    return acc + order.totalPrice
  } ,0)

  const monthlyRevenue = groupRevenueByMonth(orders);
  const OrdersStatus = groupOrdersByStatus(orders);

  return (
    <main className="flex flex-col gap-y-10">

      <div className="text-xl font-semibold">
        <h1>Orders Overview</h1>
      </div>

      <div className="wrapper grid grid-cols-4 gap-5 ">

        <DashBoardCard icon={ShoppingCart} orderValue={totalOrders} name="Total Orders" description="All orders placed to date"/>
        <DashBoardCard icon={BoxIcon} orderValue={pendingOrders} name="Pending Orders" description="Orders awaiting processing"/>
        <DashBoardCard icon={Truck} orderValue={shippedOrders} name="Shipped Orders" description="Orders currently in transit"/>
        <DashBoardCard icon={DollarSign} orderValue={deliveredOrdersRevenue} name="Total Revenue" description="Revenue from all delivered orders"/>

      </div>

        <div className="grid grid-cols-2 border-2 border-black/30 rounded-lg p-7 ">
          <MonthlyRevenueChart data={monthlyRevenue}/>
          <OrdersStatusChart data={OrdersStatus}/>
        </div>

        {/* schedule for orders */}
        <div className="">
          <OrdersTable/>
        </div>
    </main>
  )
}

export default OrdersPage