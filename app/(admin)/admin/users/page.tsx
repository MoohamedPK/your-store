import { getAllUsers } from "@/app/actions/admin/getUsers"
import { getActiveUsers } from "@/app/actions/admin/getActiveUsers";
import DashBoardCard from "@/components/adminCompo/orders/DashBoardCard";
import { getNewUsers } from "@/app/actions/admin/getNewUsers";
import { UserRound, UserRoundCheck, UserRoundPlus } from "lucide-react";
import UsersTable from "@/components/adminCompo/users/UsersTable"

const page = async () => {

    const [allUsers, activeUsers, newUsers] = await Promise.all([getAllUsers(), getActiveUsers(), getNewUsers()])
    const totalUsers = allUsers?.length || 0;
    const totalActiveUsers = Array.isArray(activeUsers) ? activeUsers.length : 0
    const totalNewUsers = Array.isArray(newUsers) ? newUsers.length : 0

  return (
    <main className="flex flex-col gap-y-10 px-2 sm:px-4 md:px-8 lg:px-16 py-4">

      <div className="text-xl font-semibold">
        <h1>Users Management</h1>
      </div>

      <div className="wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <DashBoardCard icon={UserRound} orderValue={totalUsers} name="Total Users" description="Total Users in Store"/>
        <DashBoardCard icon={UserRoundCheck} orderValue={totalActiveUsers} name="Total Active Users" description="Users Make Orders in Last Two Months"/>
        <DashBoardCard icon={UserRoundPlus} orderValue={totalNewUsers} name="New Users This Two Weeks" description="New Users in Last Two Weeks"/>
      </div>

      {/* schedule for orders */}
      <div className="w-full overflow-x-auto bg-white rounded shadow">
        <UsersTable users={allUsers ?? []}/>
      </div>
    </main>
  )
}

export default page