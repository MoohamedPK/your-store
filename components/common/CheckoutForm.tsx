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
import { clearUserCart } from "@/app/actions/cart/user/clearCart";
import { toast } from "sonner";

type checkoutInputsTypes = z.infer<typeof checkoutFormSchema>;

const CheckoutForm = ({
  cartItems,
  subTotal,
  fees,
  total,
}: {
  cartItems: NormalizedCartItem[];
  subTotal: number;
  fees: number;
  total: number;
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<checkoutInputsTypes>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const onSubmit: SubmitHandler<checkoutInputsTypes> = async (data) => {
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
          productId: item.productId,
        })),
      };

      await createOrder(order);
      await clearUserCart();
      dispatch(clearCart());
      toast.success("Thanks, Your Order Has Been Added Successfully (: ")

      router.replace("/checkout/thank-you");
      reset();
    } catch (error) {
      console.log("error submitting order", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full col-span-2">
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    {/* Name */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="name" className="text-sm font-medium text-gray-900 uppercase tracking-wide">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        className="border border-gray-300 rounded-none p-3 w-full sm:w-2/3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
        {...register("name")}
      />
      {errors.name && (
        <p className="text-xs text-red-600 font-medium">{errors.name.message}</p>
      )}
    </div>

    {/* Email */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="email" className="text-sm font-medium text-gray-900 uppercase tracking-wide">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        className="border border-gray-300 rounded-none p-3 w-full sm:w-2/3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>
      )}
    </div>

    {/* City */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="city" className="text-sm font-medium text-gray-900 uppercase tracking-wide">
        City
      </label>
      <input
        id="city"
        type="text"
        className="border border-gray-300 rounded-none p-3 w-full sm:w-2/3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
        {...register("city")}
      />
      {errors.city && (
        <p className="text-xs text-red-600 font-medium">{errors.city.message}</p>
      )}
    </div>

    {/* Address */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="address" className="text-sm font-medium text-gray-900 uppercase tracking-wide">
        Delivery Address
      </label>
      <input
        id="address"
        type="text"
        className="border border-gray-300 rounded-none p-3 w-full sm:w-2/3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
        {...register("address")}
      />
      {errors.address && (
        <p className="text-xs text-red-600 font-medium">{errors.address.message}</p>
      )}
    </div>

    {/* Phone */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="phone" className="text-sm font-medium text-gray-900 uppercase tracking-wide">
        Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        className="border border-gray-300 rounded-none p-3 w-full sm:w-2/3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
        {...register("phone")}
      />
      {errors.phone && (
        <p className="text-xs text-red-600 font-medium">{errors.phone.message}</p>
      )}
    </div>

    {/* Payment Method */}
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-medium text-gray-900 uppercase tracking-wide">
        Payment Method
      </label>
      <div className="border border-gray-300 w-full sm:w-2/3 flex items-center p-4 rounded-none bg-white">
        <input
          type="radio"
          name="paymentMethod"
          checked
          readOnly
          className="w-4 h-4 text-black focus:ring-black border-gray-300"
          aria-label="Cash On Delivery"
        />
        <span className="font-medium text-gray-900 ml-3">
          Cash On Delivery
          <span className="text-xs text-gray-600 font-normal block mt-1">Pay when you receive your order</span>
        </span>
      </div>
    </div>

    {/* Submit Button */}
    <div className="pt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center w-full sm:w-2/3 bg-black text-white py-4 rounded-none font-medium uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black border border-black"
      >
        {isLoading ? <Spinner /> : <span>Confirm Order</span>}
      </button>
    </div>
  </form>
</div>
  );
};

export default CheckoutForm;
