"use client";

import { cartProps } from "@/app/lib/definitions";
import { addToCart } from "@/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useCallback, useTransition } from "react";
import { useSession } from "next-auth/react";
import { addToUserCart } from "@/app/actions/cart/user/addToUserCart";

const AddToCartBtn = ({ productId, size, quantity }: cartProps) => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    startTransition(() => {
      if (session) {
        addToUserCart({ productId, size, quantity });
      } else {
        dispatch(addToCart({ productId, size, quantity }));
      }
    });
  }, [productId, size, quantity, session, dispatch]);

  return (
    <button
      disabled={isPending}
      onClick={handleAddToCart}
      className={`
        button-hover
        w-full text-sm sm:text-base font-medium rounded-md px-5 py-2
        transition-all duration-300
        ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-zinc-800 cursor-pointer"}
        text-white
      `}
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
