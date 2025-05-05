import Product from "@/components/Product";
import { prisma } from "@/lib/prisma"

const Products = async() => {

  const products = await prisma.product.findMany({});

  return (
    <main className="h-screen container mt-10">
      <div>
          <div className="categories flex justify-center items-center space-x-10">
            <div className="border border-black px-5 py-2 rounded-full button-hover cursor-pointer hover:bg-zinc-900 hover:text-white transition-all duration-300">
              <h1>Accessories</h1>
            </div>

            <div className="border border-black px-5 py-2 rounded-full button-hover cursor-pointer hover:bg-zinc-900 hover:text-white transition-all duration-300">
              <h1>Digital</h1>
            </div>

          </div>

          <div className="products grid grid-cols-3 gap-5 mt-20">
            {products.map((product) => (
              <Product product={product} key={product.id}/>
            ))}
          </div>
      </div>
    </main>
  )
}

export default Products