// import { getAllUsers } from "@/app/actions/admin/getUsers"
// import DashBoardCard from "@/components/adminCompo/orders/DashBoardCard";

// const page = async () => {

//     const users = await getAllUsers();

//   return (
//     <main className="flex flex-col gap-y-10">

//       <div className="text-xl font-semibold">
//         <h1>Users Management</h1>
//       </div>

//       <div className="wrapper grid grid-cols-4 gap-5 ">

//         <DashBoardCard icon={ShoppingCart} orderValue={totalOrders} name="Total Orders" description="All orders placed to date"/>
//         <DashBoardCard icon={BoxIcon} orderValue={pendingOrders} name="Pending Orders" description="Orders awaiting processing"/>
//         <DashBoardCard icon={Truck} orderValue={shippedOrders} name="Shipped Orders" description="Orders currently in transit"/>
//         <DashBoardCard icon={DollarSign} orderValue={deliveredOrdersRevenue} name="Total Revenue" description="Revenue from all delivered orders"/>

//       </div>

//         {/* schedule for orders */}
//         <div className="">

//         </div>
//     </main>
//   )
// }

// export default page