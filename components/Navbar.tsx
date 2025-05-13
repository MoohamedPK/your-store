import Link from "next/link"
import { User2Icon } from "lucide-react"
import { CartIcon } from "./CartIcon"

const Navbar = () => {
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
                        <User2Icon/>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar