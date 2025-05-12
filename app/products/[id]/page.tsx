import AddToCartBtn from "@/components/common/AddToCartBtn"
import { currancyFormatter } from "@/lib/formatters"
import { productById } from "@/server/db/products"
import Image from "next/image"

const ProductDetails = async ({params}: {params: {id: string}}) => {

  const productId = params.id
  const product = await productById(productId)
  
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
                
                <AddToCartBtn id={productId}/>


              </div>
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