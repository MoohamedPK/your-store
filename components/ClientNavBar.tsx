'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const ClientNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon (mobile only) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} className="text-white"/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden p-6 text-center absolute top-16 left-0 w-full bg-black text-white z-40">
          <ul className="flex flex-col space-y-4 font-semibold">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default ClientNavbar;
