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
      sizes: true
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
              {product && (
                <span className="border-[1px] border-black px-6 py-1 font-bold text-lg">{currancyFormatter(product.price)}</span>
              )}
              <div className="flex mt-5">
                <label htmlFor="">Choose size</label>
                <select name="select" id="">
                {product?.sizes.map((size) => (
                  <option value={size.name} key={size.id}>{size.name}</option>
                ))}
              </select>
              </div>
          </div>
      </div>
    </main>
  )
}

export default ProductDetails