import Link from "next/link"
import { User } from "lucide-react"
import { CartIcon } from "./CartIcon"
import { auth } from "@/auth"
// import Image from "next/image"

const Navbar = async () => {

    const session = await auth()

  return (
        <nav className="container flex justify-between items-center pb-6 bg-zinc-900 text-white sticky top-0 z-90">
            <div className="logo">
                <h1 className="text-3xl font-bold">Your Store</h1>
            </div>

            <ul className="space-x-8 font-semibold">
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                <Link href={'/'}>About</Link>
                <Link href={'/'}>Contact</Link>
            </ul>
            
            <div className="flex justify-between items-center space-x-5 font-semibold">

                <div className="icons flex items-center space-x-5">
                    {/* cart */}
                    <CartIcon/>

                    {/* user */}
                    <div className="cursor-pointer">
                        {session?.user ? (
                            <div>
                                {session?.user ? (
                                    <div><User size={23}/></div>
                                ) : (
                                    <div>
                                        {/* <Image src={session?.user.image} alt='profile' width={20} height={20}/> */}
                                        profile
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={'/login'}>
                                <p>Login</p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar