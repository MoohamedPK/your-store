import { getAuthSession } from "@/app/lib/auth";
import AdminNavBar from "@/components/adminCompo/navBar/AdminNavBar";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-white">
  {/* Sidebar: fixed on desktop, toggled on mobile */}
  <AdminNavBar />

  {/* Main content */}
  <main className="p-6 md:ml-64 pt-20 md:pt-6">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </main>
</div>
  );
};

export default layout;
