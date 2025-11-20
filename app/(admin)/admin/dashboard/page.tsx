// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "@/app/lib/auth";

const DashboardPage = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-8 md:px-16 py-16 bg-white border border-gray-200 rounded-none">
  <div className="text-center space-y-6">
    {/* Main Title */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
      Admin Dashboard
    </h1>
    
    {/* Welcome Message */}
    <div className="space-y-3">
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-normal tracking-wide">
        Welcome back, <span className="font-medium text-black">{session?.user.name}</span>
      </p>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
          {session?.user.role}
        </span>
        <div className="w-2 h-2 bg-black rounded-full"></div>
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="pt-8">
      <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
    </div>
  </div>
</div>
  )
}

export default DashboardPage