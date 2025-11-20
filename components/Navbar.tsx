import Link from "next/link";
import CartIconWrapper from "./common/CartIconWrapper";
import UserMenu from "./common/UserMenu";
import ClientNavbar from "@/components/ClientNavBar";

const Navbar = async () => {
  return (
    <nav className="bg-black/50 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/10">
      {/* Gradient accent line */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center ">
          {/* Logo with modern styling */}
          <Link href="/" className="group">
            <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              ShopHub
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <ul className="flex items-center space-x-1">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" }
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="relative px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 group/nav-link"
                  >
                    {item.label}
                    {/* Hover underline effect */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover/nav-link:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icons with modern styling */}
            <div className="flex items-center space-x-4 pl-4 border-l border-white/20">
              <div className="relative group/cart">
                <CartIconWrapper />
                {/* Tooltip effect */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  Your Cart
                </div>
              </div>
              
              <div className="relative group/user">
                <UserMenu />
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover/user:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  Account
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            {/* Icons with badge styling */}
            <div className="flex items-center gap-3">
              <div className="relative group/cart-mobile">
                <CartIconWrapper />
              </div>
              
              <div className="relative group/user-mobile">
                <UserMenu />
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="pl-3 border-l border-white/30">
              <ClientNavbar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;