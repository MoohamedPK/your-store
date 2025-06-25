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
        await updateUserCartQuantity({ productId, size, quantity: newQuantity });
      } else {
        dispatch(updateQuantity({ productId, size, quantity: newQuantity }));
        router.refresh();
      }
    });
  };

  return (
    <div className="border border-black rounded-full px-3 py-1 select-none w-max">
      <div className="flex items-center justify-between space-x-3">
        <button
          onClick={() => handleChange(-1)}
          className="bg-zinc-800 rounded-full text-white p-1 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={isPending || quantity <= 1}
          aria-label="Decrease quantity"
          type="button"
        >
          <Minus size={16} />
        </button>

        <span className="font-semibold min-w-[24px] text-center">{quantity}</span>

        <button
          onClick={() => handleChange(1)}
          className="bg-zinc-800 rounded-full text-white p-1 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
