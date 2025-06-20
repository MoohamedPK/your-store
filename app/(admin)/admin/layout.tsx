import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import Sidebar from "@/components/adminCompo/Sidebar";


const layout = async ({children}: {children: React.ReactNode}) => {

  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return redirect('/')
  } 

  return (
    <div className="flex">
        <Sidebar/>

        <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  )
}

export default layout