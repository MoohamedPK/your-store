// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "@/app/lib/auth";

const DashboardPage = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 sm:px-8 md:px-16 py-8 bg-gray-50 rounded shadow">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Admin Dashboard</h1>
      <p className="mt-4 font-semibold text-base sm:text-lg md:text-xl text-center">
        Welcome, {session?.user.name} <span className="text-xs text-gray-500 font-semibold">({session?.user.role})</span>. Here is your overview.
      </p>
    </div>
  )
}

export default DashboardPage