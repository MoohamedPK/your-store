import BackButton from "@/components/adminCompo/orders/BackButton";
import { allProducts } from "@/server/db/products";
import Link from "next/link";


const page = async () => {

    const products = await allProducts()

    return (
    <div>
      <BackButton/>
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Product
        </Link>
      </div>

      <table className="w-full border-collapse border border-zinc-300 text-sm">
        <thead className="bg-zinc-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">In Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center hover:bg-zinc-50">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">MAD {product.price.toFixed(2)}</td>
              <td className="p-2 border">{product.stock}</td>
              <td className="p-2 border space-x-2">
                <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page