"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const links = [
    { href: "/admin/dashboard", name: "Dashboard" },
    { href: "/admin/products", name: "Products" },
    { href: "/admin/orders", name: "Orders" },
    { href: "/admin/users", name: "Users" },
    { href: "/admin/categories", name: "Categories" },
    ];

    const AdminNavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`bg-black h-screen text-white/80 p-6 border-r border-gray-700 fixed top-0 z-50 w-64 transition-all duration-300 ${menuOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
  {/* Toggle Button */}
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white text-black absolute -right-4 top-8 cursor-pointer border border-gray-300 hover:bg-gray-100 transition-all duration-300 p-1"
            aria-label="Toggle menu"
        >
            {menuOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>
        
        <div className="flex flex-col space-y-10 h-full">
            {/* Logo Section */}
            <div className="border-b border-gray-700 pb-6">
            <h1 className="text-2xl font-light tracking-tight">AdminPanel</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-2 flex-1">
            {links.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                className="px-3 py-3 text-sm font-medium tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-200 border-l-2 border-transparent hover:border-black"
                >
                {link.name}
                </Link>
            ))}
            </div>

            {/* Footer Section */}
            <div className="border-t border-gray-700 pt-6">
            <div className="text-xs text-gray-400 uppercase tracking-wide">
                Admin Portal
            </div>
            </div>
        </div>
</nav>
    );
};

export default AdminNavBar;
