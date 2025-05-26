// 'use client'

// import { useDispatch, useSelector } from "react-redux"
// import { useSession } from "next-auth/react"
// import { clearCart } from "@/redux/cart/cartSlice"
// import { RootState } from "@/redux/store"
// import { useEffect } from "react"


// const SyncCartOnLogin = () => {

//     const dispatch = useDispatch()
//     const cart = useSelector((state:RootState) => state.cart.items)
//     const {status} = useSession()

//     useEffect(() => {
//         if (status === "authenticated" && cart.length > 0) {
//             (async () => {
//                 try {
//                     await syncCartToDb(cart);
//                     dispatch(clearCart());
//                 } catch (error) {
//                     console.log('failed to sync cart', error);
                    
//                 }
//             })()
//         }
//     }, [status, cart, dispatch])

//   return null
// }

// export default SyncCartOnLogin