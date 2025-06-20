
import type { Product } from "@prisma/client"
import Image from "next/image";
import Link from "next/link";
import { currancyFormatter } from "@/app/lib/formatters";
import AddToCartBtn from "@/components/common/AddToCartBtn";
import { CartProductsType } from "@/app/lib/definitions";

const Product = ({product}: {product: CartProductsType,}) => {

    const {id, name, description, price, image, sizes} = product;
    const defaultSize = sizes[1].name
    
  return (
    <div className="w-[350px] px-4 py-6 default-border cursor-pointer group ">
        <Link href={`/products/${id}`} key={id} className="space-y-3">
            <h1 className="font-semibold text-xl">{name}</h1>
            <p className="truncate text-sm font-semibold">{description}</p>
            <span className="font-bold px-3 text-lg small-border border-black">{currancyFormatter(Number(price))}</span>
            <Image src={image} alt="prod image" width={250} height={250} className="my-3 mx-auto group-hover:scale-85 transition-transform duration-300"/>
        </Link>
        <AddToCartBtn productId={id} size={defaultSize} quantity={1}/>
    </div>
  )
}

export default Product