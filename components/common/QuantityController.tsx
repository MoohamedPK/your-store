"use client";

import { updateQuantity } from "@/redux/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { cartProps } from "@/app/lib/definitions";
import { useTransition } from "react";
import { updateUserCartQuantity } from "@/app/actions/cart/user/updateUserCartQuantity";
import { useRouter } from "next/navigation";

const QuantityController = ({ quantity, size, productId }: cartProps) => {
  
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Handle quantity change: +1 or -1
  const handleChange = (delta: number) => {
    // Calculate new quantity and prevent below 1
    const newQuantity = quantity + delta;
    if (newQuantity < 1) return;

    startTransition(async () => {
      if (session) {
        await updateUserCartQuantity({ productId, size, quantity: delta });
      } else {
        dispatch(updateQuantity({ productId, size, quantity: delta }));
        router.refresh();
      }
    });
  };

  return (
    <div className="border border-gray-400 rounded-none px-4 py-2 select-none w-max bg-white">
  <div className="flex items-center justify-between space-x-4">
    <button
      onClick={() => handleChange(-1)}
      className="bg-white border border-gray-400 rounded-none text-black p-1 hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-400 transition-all duration-200"
      disabled={isPending || quantity <= 1}
      aria-label="Decrease quantity"
      type="button"
    >
      <Minus size={16} />
    </button>

    <span className="font-medium min-w-[28px] text-center text-gray-900 text-sm tracking-wide">
      {quantity}
    </span>

    <button
      onClick={() => handleChange(1)}
      className="bg-white border border-gray-400 rounded-none text-black p-1 hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-400 transition-all duration-200"
      disabled={isPending}
      aria-label="Increase quantity"
      type="button"
    >
      <Plus size={16} />
    </button>
  </div>
</div>
  );
};

export default QuantityController;
