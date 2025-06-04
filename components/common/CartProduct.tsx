'use client'

import { NormalizedCartItem } from "@/app/lib/definitions"
import Image from "next/image";
import QuantityController from "./QuantityController";
import DeleteProduct from "./DeleteProduct";
import { useState } from "react";
import { ProductSizes } from "@prisma/client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CartProduct = ({item}: {item: NormalizedCartItem }) => {
    
    const {productId, name, image, price, sizes ,size} = item;
    const [selectedSize, setSelectedSize] = useState(size)

    const quantity = useSelector((state: RootState) => {
        const cartItem = state.cart.items.find(item => item.productId === productId && item.size === selectedSize)
        return cartItem ? cartItem.quantity : 0
    })

    return (
        <div className="flex justify-between" key={productId}>

            <div className="left flex capitalize">
                <div>
                    <Image src={image} alt={name} width={350} height={350}/>
                </div>
                <div className="space-y-10">
                    <h1 className="font-semibold text-xl">{name}</h1>
                    
                    <div className="flex mt-5 space-x-5">
                    <label htmlFor="">Choose size</label>
                    <select name="select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value as ProductSizes)}>
                    {sizes?.map((size) => (
                        <option value={size.name} key={size.id}>{size.name}</option> 
                    ))}
                    </select>
                    </div>
                </div>
            </div>

            <div className="right space-y-10">
                    <div className="delete">
                        <DeleteProduct currentQuantity={quantity} size={selectedSize} productId={productId} />
                    </div>

                    <div className="space-y-10">
                        <div className="quantity text-center">
                            <span className="text-sm text-neutral-600">Quantity</span>
                            <QuantityController quantity={quantity} size={selectedSize} productId={productId} />
                        </div>

                        <div className="price font-semibold py-1 px-3 border-[1px] border-black">
                            <span>MAD {Number(price)}</span>
                        </div>
                    </div>
            </div>

            {/* checkout will take then the {productId, selectedSize, quantity} */}
        </div>
    )
}

CartProduct.displayName = "CartProduct"

export default CartProduct




