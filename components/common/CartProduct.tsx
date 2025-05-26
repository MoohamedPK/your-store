'use client'

import { CartProductsType } from "@/app/lib/definitions"
import Image from "next/image";
import QuantityController from "./QuantityController";
import DeleteProduct from "./DeleteProduct";

const CartProduct = ({product}: {product:CartProductsType}) => {

    const {id, name, image, price, sizes} = product
    
    return (
        <div className="flex justify-between" key={id}>

            <div className="left flex capitalize">
                <div>
                    <Image src={image} alt={name} width={350} height={350}/>
                </div>

                <div className="space-y-10">
                    <h1 className="font-semibold text-xl">{name}</h1>
                    
                    <div className="flex mt-5 space-x-5">
                    <label htmlFor="">Choose size</label>
                    <select name="select" id="">
                    {sizes.map((size) => (
                        <option value={size.name} key={size.id}>{size.name}</option> 
                    ))}
                    </select>
                    </div>
                </div>
            </div>

            <div className="right space-y-10">
                    <div className="delete">
                        <DeleteProduct/>
                    </div>

                    <div className="space-y-10">
                        <div className="quantity text-center">
                            <span className="text-sm text-neutral-600">Quantity</span>
                            <QuantityController/>
                        </div>

                        <div className="price font-semibold py-1 px-3 border-[1px] border-black">
                            <span>MAD {Number(price)}</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

CartProduct.displayName = "CartProduct"

export default CartProduct