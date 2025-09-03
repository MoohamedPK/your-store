import Link from "next/link";
import CartIconWrapper from "./common/CartIconWrapper";
import UserMenu from "./common/UserMenu";
import ClientNavbar from "@/components/ClientNavBar";

const Navbar = async () => {
  return (
    <nav className="bg-zinc-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold">ShopHub</div>

        {/* Desktop nav links + icons */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8 font-semibold">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          <div className="flex items-center space-x-5">
            <CartIconWrapper />
            <UserMenu />
          </div>
        </div>

        {/* Mobile icons and menu */}
        <div className="flex md:hidden items-center gap-4">
          <CartIconWrapper />
          <UserMenu />
          <ClientNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;