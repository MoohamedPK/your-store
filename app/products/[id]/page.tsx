import { currancyFormatter } from "@/lib/formatters"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

const ProductDetails = async ({params}: {params: {id: string}}) => {
  const productId = parseInt(params.id, 10)
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    },
    include: {
      sizes: false
    }
  }) 
  return (
    <main className="h-screen">
      <div className="container grid grid-cols-2 items-center">
          <div className="left">
            <Image src={product?.image || "/placeholder.png"} alt="product image" width={500} height={500}/>
          </div>

          <div className="right space-y-10">
              <h1 className="text-5xl font-semibold ">{product?.name}</h1>
              <p className="leading-8 font-semibold">{product?.description}</p>
              <div className="flex justify-between items-center text-white">
                {product && (
                  <span className="border-[1px] text-black border-black px-6 py-2 font-bold text-lg">{currancyFormatter(product.price)}</span>
                )}
                <button className="flex items-center text-xl px-8 py-2 space-x-5 bg-zinc-900 cursor-pointer shadow-2xl shadow-blue-800 button-hover">
                  <span>Shop Now</span>
              </button>
              </div>
              <div className="flex mt-5">
                <label htmlFor="">Choose size</label>
                <select name="select" id="">
                {/* {product?.sizes.map((size) => (
                  <option value={size.name} key={size.id}>{size.name}</option>
                ))} */}
              </select>
              </div>
          </div>
      </div>
    </main>
  )
}

export default ProductDetails