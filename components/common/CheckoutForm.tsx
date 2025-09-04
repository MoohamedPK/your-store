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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="font-semibold">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            className="border rounded-lg p-2 w-full sm:w-1/2"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="font-semibold">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            className="border rounded-lg p-2 w-full sm:w-1/2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="city" className="font-semibold">
            City
          </label>
          <input
            id="city"
            type="text"
            className="border rounded-lg p-2 w-full sm:w-1/2"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="address" className="font-semibold">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="border rounded-lg p-2 w-full sm:w-1/2"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="phone" className="font-semibold">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="border rounded-lg p-2 w-full sm:w-1/2"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Payment Method</label>
          <div className="border w-full sm:w-1/2 flex items-center py-6 px-3 rounded-lg space-x-4">
            <input
              type="radio"
              name="paymentMethod"
              checked
              readOnly
              className="w-5 h-5"
              aria-label="Cash On Delivery"
            />
            <span className="font-medium">
              COD <span className="text-xs font-semibold">(Cash On Delivery)</span>
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center w-full sm:w-1/2 bg-black text-white py-2 rounded-lg button-hover cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : <span>Confirm Order</span>}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
