import { auth } from "@/app/api/auth/[...nextauth]/route"

const Profile = async() => {

    const session = await auth();

  return (
    <div>
        {session?.user ? (
            <p className="text-4xl text-center mt-10 font-semibold uppercase">welcome {session.user.name} <span className="text-sm text-gray-500">({session.user.role})</span></p>
        ) : (
            <p>not authenticated</p>
        ) }
    </div>
  )
}

export default Profile