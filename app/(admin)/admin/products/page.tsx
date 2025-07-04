import BackButton from "@/components/adminCompo/orders/BackButton";
import DeleteProductButton from "@/components/common/DeleteButton";
import { allProducts } from "@/server/db/products";
import Link from "next/link";


const page = async () => {

    const products = await allProducts()

    return (
    <div className="">
      <BackButton/>
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-800/85">
          + Add Product
        </Link>
      </div>

      <table className="w-full text-sm mt-10 bg-neutral-400/60">
        <thead className="bg-zinc-100">
          <tr>
            <th className="p-2 ">Name</th>
            <th className="p-2 ">Price</th>
            <th className="p-2 ">In Stock</th>
            <th className="p-2 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center hover:bg-zinc-50">
              <td className="p-2">{product.name}</td>
              <td className="p-2 ">MAD {product.price.toFixed(2)}</td>
              <td className="p-2 ">{product.stock}</td>
              <td className="p-2 space-x-2">
                <Link href={`/admin/products/${product.id}/update`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                {/* <button className="text-red-600 hover:underline">Delete</button> */}
                <DeleteProductButton id={product.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page