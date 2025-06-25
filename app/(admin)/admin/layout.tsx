// import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getAuthSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/adminCompo/Sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 dark:bg-zinc-900">
      
      {/* Sidebar wrapper - fixed on desktop */}
      <aside
        className="
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-800
          border-r border-zinc-300 dark:border-zinc-700
          hidden md:block z-50
        "
      >
        <Sidebar />
      </aside>

      {/* Main content with padding left on desktop to avoid content under sidebar */}
      <main
        className="
          flex-1 p-4 sm:p-6 md:p-8
          md:ml-64
          min-h-screen
        "
      >
        {children}
      </main>
    </div>
  );
};

export default layout;
