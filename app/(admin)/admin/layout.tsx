import { getAuthSession } from "@/app/lib/auth";
import AdminNavBar from "@/components/adminCompo/navBar/AdminNavBar";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen">
      {/* Sidebar: fixed on desktop, toggled on mobile */}
      <AdminNavBar />

      {/* Main content */}
      <main className="p-4 pt-16 md:ml-64">
        {children}
      </main>
    </div>
  );
};

export default layout;
