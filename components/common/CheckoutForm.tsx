"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "@/zod/checkoutForm";
import z from "zod";
import { NormalizedCartItem } from "@/app/lib/definitions";
import { createOrder } from "@/app/actions/checkout/createOrder";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../ui/Spinner";

type checkoutInputsTypes = z.infer<typeof checkoutFormSchema>;

const CheckoutForm = ({cartItems, subTotal, fees, total}: {cartItems: NormalizedCartItem[], subTotal: number, fees: number, total: number}) => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<checkoutInputsTypes>({resolver: zodResolver(checkoutFormSchema)});

    const onSubmit:SubmitHandler<checkoutInputsTypes> = async (data) => {
        setIsLoading(true);

        try {
            const order = {
                name: data.name,
                userEmail: data.email,
                city: data.city,
                streetAddress: data.address,
                phone: data.phone,
                subtotalPrice: subTotal,
                deliveryFee: fees,
                totalPrice: total,
                products: cartItems.map((item) => ({
                    quantity: item.quantity,
                    productId: item.productId
                }))
            }
    
            await createOrder(order);
            dispatch(clearCart());
            router.replace('/checkout/thank-you');
            reset()
        } catch (error) {
            console.log("error submitting order",error)
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="w-full col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="left space-y-5">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="">Your Name</label>
                        <input className="border rounded-lg p-2 w-1/2" type="text" {...register("name")} />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="">Your Email</label>
                        <input className="border rounded-lg p-2 w-1/2" type="text" {...register('email')} />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="">City</label>
                        <input className="border rounded-lg p-2 w-1/2" type="text" {...register('city')} />
                        {errors.city && (
                            <p className="text-xs text-red-500">{errors.city.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="">Address</label>
                        <input className="border rounded-lg p-2 w-1/2" type="text" {...register('address')} />
                        {errors.address && (
                            <p className="text-xs text-red-500">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="">Phone Number</label>
                        <input className="border rounded-lg p-2 w-1/2" type="text" {...register('phone')}/>
                        {errors.phone && (
                            <p className="text-xs text-red-500">{errors.phone.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="">Payment Method</label>
                        <div className=" border w-1/2 flex items-center py-6 rounded-lg">
                            <input className="border rounded-lg p-2 w-1/2" type="radio" checked/>
                            <h1>COD <span className="text-xs font-semibold">(Cash On Delivery)</span></h1>
                            
                        </div>
                        
                    </div>

                <button type="submit" disabled={isLoading} className="flex justify-center w-1/2 bg-black text-white py-2 rounded-lg button-hover cursor-pointer">
                        {isLoading ? (
                            <Spinner/>
                        ) : (
                            <span>Confirm Order</span>
                        )}
                </button>
                </div>

            </form>
    </div>
  )
}

export default CheckoutForm