import type { Product } from "@prisma/client"
import Image from "next/image";
import Link from "next/link";
import { currancyFormatter } from "@/lib/formatters";
import AddToCartBtn from "@/common/AddToCartBtn";


const Product = ({product}: {product: Product}) => {
    const {id, name, description, price, image} = product;
    
  return (
    <div className="px-4 py-6 border-2 border-black cursor-pointer group">
        <Link href={`/products/${id}`} key={id} className="space-y-3">
            <h1 className="font-semibold text-xl">{name}</h1>
            <p className="truncate text-sm font-semibold">{description}</p>
            <span className="font-bold px-3 text-lg border-[1px] border-black">{currancyFormatter(price)}</span>
            <Image src={image} alt="prod image" width={350} height={350} className="my-3 group-hover:scale-85 transition-transform duration-300"/>
        </Link>
        <AddToCartBtn id={id}/>
    </div>
  )
}

export default Product