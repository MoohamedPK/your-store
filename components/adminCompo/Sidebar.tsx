"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/categories", label: "Categories" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="block md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-zinc-900 text-white"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar drawer for mobile */}
      <aside
        className={`
          fixed top-0 left-0 w-64 bg-zinc-900 text-white p-6 z-40
          h-screen overflow-y-auto
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            className="p-1 rounded hover:bg-zinc-800"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-4 mt-12">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block hover:text-blue-400"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Static sidebar for desktop */}
      <aside className="hidden md:block p-6 text-white bg-zinc-900 h-full">
        <h1 className="text-xl font-bold mb-12">Admin Panel</h1>
        <nav className="space-y-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
