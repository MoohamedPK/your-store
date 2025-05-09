// "use client" 
// import { useSelector } from "react-redux"
// import { useEffect, useState } from "react"
// import { RootState } from "@/redux/store"
// import Product from "./Product"

// const CartPage = () => {

//     const items = useSelector((state:RootState) => state.cart.items);
//     const productsIds = Object.keys(items);
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         if (productsIds.length > 0 ) {
//             fetch("/api/cartProducts", {method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ids: productsIds})}).then(res => res.json()).then(setProducts)
//         }
//     }, [productsIds])


//   return (
//     <main className="flex flex-col container">
//         <div>
//             {products.map((product) => (
//                 <Product product={product} key={product}/>
//             ))}
//         </div>
//     </main>
//   )
// }

// export default CartPage