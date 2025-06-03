'use client'

import { ProductsWithSizes } from "@/app/lib/definitions"
import Image from "next/image";
import QuantityController from "./QuantityController";
import DeleteProduct from "./DeleteProduct";
import { useState } from "react";
import { ProductSizes } from "@prisma/client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const CartProduct = ({product}: {product: ProductsWithSizes}) => {
    const {id, sizes, name, image, price, CartItem} = product;

    console.log(CartItem)
    const [selectedSize, setSelectedSize] = useState(sizes[0].name);    

    const handleSize = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSize(e.target.value as ProductSizes)
    }

    const cartItem = useSelector((state:RootState) => state.cart.items.find((item) => item.productId === id && item.size === selectedSize));
    const currentQuantity = cartItem?.quantity || 1

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
                    <select name="select" id="" onChange={(e) => handleSize(e)} value={selectedSize}>
                    {sizes.map((size) => (
                        <option value={size.name} key={size.id}>{size.name}</option> 
                    ))}
                    </select>
                    </div>
                </div>
            </div>

            <div className="right space-y-10">
                    <div className="delete">
                        <DeleteProduct currentQuantity={currentQuantity} size={selectedSize} productId={id} />
                    </div>

                    <div className="space-y-10">
                        <div className="quantity text-center">
                            <span className="text-sm text-neutral-600">Quantity</span>
                            <QuantityController currentQuantity={currentQuantity} size={selectedSize} productId={id} />
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