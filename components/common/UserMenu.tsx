"use client"
import { signOut, useSession } from "next-auth/react"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { clearCart } from "@/redux/cart/cartSlice"

const UserMenu = () => {

    const {data: session} = useSession()
    const [dropDown, setDropDown] = useState<boolean>(false);
    const router = useRouter()
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut()
        router.replace('/')
        setDropDown(!dropDown)
        dispatch(clearCart())
    }

    const handleProfileLink = () => {
        setDropDown(!dropDown);
        router.replace("/profile");
    }

  return (
    <div className="relative">

        {session?.user ? (
            <div className="">
                <div className="" onClick={() => setDropDown(!dropDown)}>
                    {!session?.user.image ? (
                        <button className="cursor-pointer"><User size={23}/></button>
                    ) : (
                        <button className="cursor-pointer">
                            <Image src={session?.user.image} alt='profile' width={40} height={40} className="rounded-full"/>
                        </button>
                    )}
                </div>

                {dropDown && (
                    <div className="absolute p-3 top-14 right-0 w-[150px] h-[150px] rounded-lg bg-zinc-400/70 text-sm font-medium text-center flex flex-col justify-around">
                        <button className="bg-zinc-800 py-1.5 rounded-lg cursor-pointer" onClick={handleProfileLink}>Profile</button>
                        <button className="bg-zinc-800 py-1.5 rounded-lg cursor-pointer" onClick={handleSignOut}>logout</button>
                    </div>
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