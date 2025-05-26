"use client"
import { useSession } from "next-auth/react"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const UserMenu = () => {

    const {data: session} = useSession()

  return (
    <div>

        {session?.user ? (
            <div>
                {!session?.user.image ? (
                    <Link href={'/profile'}><User size={23}/></Link>
                ) : (
                    <Link href={'/profile'}>
                        <Image src={session?.user.image} alt='profile' width={40} height={40} className="rounded-full"/>
                    </Link>
                )}
            </div>
        ) : (
            <Link href={'/login'}>
                <p>Login</p>
            </Link>
        )}

    </div>
  )
}

export default UserMenu