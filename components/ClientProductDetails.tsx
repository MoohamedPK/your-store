'use client'

import Image from "next/image"
import AddToCartBtn from "@/components/common/AddToCartBtn"
import { currancyFormatter } from "@/app/lib/formatters"
import { Product, ProductSizes, Size } from "@prisma/client"
import { useState } from "react"

type Props = {
    product: Product & { sizes: Size[]};
};

const ClientProductDetails = ({product}:Props) => {

    const [selectedSize, setSelectedSize] = useState<ProductSizes>(product.sizes[1].name) // set the first size as default
    const handleSize = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSize(e.target.value as ProductSizes)
    }
    
  return (
    <main className="h-screen">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="left">
            <Image src={product?.image || "/placeholder.png"} alt="product image" width={500} height={500}/>
          </div>

          <div className="right space-y-10">
              <h1 className="text-5xl font-semibold ">{product?.name}</h1>
              <p className="leading-8 font-semibold">{product?.description}</p>
              <div className="flex justify-between items-center text-white">
                {product && (
                  <span className="border-[1px] text-black border-black px-6 py-2 font-bold text-lg">{currancyFormatter(Number(product.price))}</span>
                )}
                {/* note that the quantity and size here should be updated according to the selected values */}
                <AddToCartBtn productId={product.id} quantity={1} size={selectedSize}/> 
              </div>

              <div className="flex justify-between mt-5">
                <label htmlFor="" className="text-gray-500 text-sm">Choose size</label>
                <select name="select" onChange={(e) => handleSize(e)} value={selectedSize}>
                {product?.sizes.map((size: Size) => (
                  <option value={size.name} key={size.id}>{size.name}</option>
                ))}
              </select>
              </div>
              
          </div>
      </div>
    </main>
  )
}

export default ClientProductDetails