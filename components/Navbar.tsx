// app/components/Navbar.tsx (Server Component)

import Link from "next/link";
import CartIconWrapper from "./common/CartIconWrapper";
import UserMenu from "./common/UserMenu";
import ClientNavbar from "@/components/ClientNavBar";

const Navbar = async () => {
  return (
    <nav className="bg-zinc-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold">Your Store</div>

        {/* Desktop nav links + icons */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/">About</Link></li>
          <li><Link href="/">Contact</Link></li>
        </ul>

        <div className="hidden md:flex items-center space-x-5">
          <CartIconWrapper />
          <UserMenu />
        </div>

        {/* Client-side hamburger menu */}
        <ClientNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
