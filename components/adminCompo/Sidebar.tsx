import Link from "next/link";

const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/categories", label: "Categories" },
  ];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-zinc-900 text-white p-4 ">
        <h1>Admin Panel</h1>

        <nav className="space-y-4 mt-12"> 
            {links.map(link => (
                <Link className="block hover:text-blue-400" key={link.label} href={link.href}>{link.label}</Link>
            ))}
        </nav>
    </aside>
  )
}

export default Sidebar