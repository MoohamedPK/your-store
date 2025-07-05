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
        <nav className={`bg-zinc-900 h-screen text-white/80 p-4 border-b border-zinc-700 fixed -top-0 z-90 w-64 transition-all duration-300 ${menuOpen ? "" : "translate-x-[-100%]" }`}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-black absolute -right-8 top-[50%] cursor-pointer"  
                aria-label="Toggle menu"
                >
                {menuOpen ? <ChevronsLeft size={30} /> : <ChevronsRight size={30} />}
            </button>
        <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="flex">   
                {/* Logo */}
                <h1 className="text-xl font-bold">AdminPanel</h1>
                
            </div>

            {/* Desktop Links */}
            <div className="flex flex-col space-y-6">
            {links.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition"
                >
                {link.name}
                </Link>
            ))}
            </div>

        </div>
        </nav>
    );
};

export default AdminNavBar;
