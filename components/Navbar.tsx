import Link from "next/link"
import Search from "./Search"
import { User2Icon, LucideShoppingBag } from "lucide-react"

const Navbar = () => {
  return (
        <nav className="container flex justify-between items-center border-b-2 border-black pb-6 mask-radial-at-center">
            <div className="logo">
                <h1 className="text-3xl font-bold">Your Store</h1>
            </div>

            <ul className="space-x-8 font-semibold">
                <Link href={'/'}>Home</Link>
                <Link href={'/'}>Apparel</Link>
                <Link href={'/'}>Accessories</Link>
                <Link href={'/'}>Digital</Link>
            </ul>
            
            <div className="flex justify-between items-center space-x-5 font-semibold">
                <div className="search">
                    <Search/>
                </div>

                <div className="icons flex items-center space-x-5">
                    {/* cart */}
                    <div className="cursor-pointer">
                        <LucideShoppingBag/>
                    </div>
                    <div className="cursor-pointer">
                        <User2Icon/>
                    </div>
                    {/* user */}
                </div>
            </div>
        </nav>
  )
}

export default Navbar