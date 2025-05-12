"use client" 
import { RootState } from "@/redux/store"
import { useEffect, useState, useMemo } from "react"
import {useSelector} from "react-redux"
import CartProduct from "@/components/common/CartProduct"
import { CartProductsType } from "@/lib/definitions"

const CartPage = () => {

    const productIds = useSelector((state:RootState) => state.cart.items)
    const [products, setProducts] = useState<CartProductsType[]>([]); 
    const ids = useMemo(() => Object.keys(productIds), [productIds]); // Object.keys() creates a new array each time your component renders
    
    useEffect(() => {
        fetch(`/api/cart-products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ids})
        }).then(res => res.json()).then(data => setProducts(data.data))
    }, [ids])

    return (
        <div className="flex flex-col gap-5 container">
            {products.map((product, index) => (
                <>
                    <CartProduct key={index} product={product} quantity={productIds[product.id]}/>
                    <hr/>
                </>
            ))}
        </div>
    )
}

export default CartPage