import { auth } from "@/app/api/auth/[...nextauth]/route"


const DashboardPage = async () => {

  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 font-semibold text-lg">Welcome, {session?.user.name} <span className=" text-xs text-gray-500 font-semibold">({session?.user.role})</span>.  Here's your overview.</p>
    </div>
  )
}

export default DashboardPage