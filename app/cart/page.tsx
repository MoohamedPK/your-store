
// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "../lib/auth";
import { getUserCart } from "@/app/actions/cart/user/getUserCart"
import CartProduct from "@/components/common/CartProduct";
import { getGuestCart } from "../actions/cart/guest/getGuestCart";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { calculateTotal } from "../lib/utils";

const page = async () => {

  const session = await getAuthSession();

  const cart = session?.user?.id ? await getUserCart() || [] : await getGuestCart() || [];
  const total = calculateTotal(cart.filter((item): item is NonNullable<typeof item> => item !== null))
  
    return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-screen py-8">
  {/* Cart Items Section */}
  <div className="lg:col-span-3 space-y-6">
    {cart.length === 0 ? (
      <div className="text-2xl font-light text-gray-900 text-center py-16 border border-gray-200 bg-white">
        Your cart is empty
      </div>
    ) : (
      cart
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .sort((a, b) => a.productId.localeCompare(b.productId))
        .map((item) => (
          <CartProduct key={item.productId + item.size} item={item} />
        ))
    )}
  </div>

  {/* Summary Section */}
  {cart.length !== 0 && (
    <div className="bg-white border border-gray-300 w-full rounded-none p-6 flex flex-col gap-6 lg:sticky lg:top-8 h-fit">
      {/* Total Price */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wide mb-2">Order Summary</h3>
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-700 font-medium">Total:</span>
          <span className="text-2xl font-bold text-black">{total} MAD</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout">
        <div className="group bg-black text-white font-medium uppercase tracking-wide rounded-none py-4 px-6 flex items-center justify-center space-x-3 hover:bg-gray-800 transition-all duration-300 border border-black cursor-pointer">
          <p>Proceed to Checkout</p>
          <ArrowRightIcon size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>

      {/* Continue Shopping */}
      <Link href="/products">
        <div className="text-center text-sm text-gray-600 hover:text-black transition-colors duration-300 border-t border-gray-200 pt-4">
          Continue Shopping
        </div>
      </Link>
    </div>
  )}
</div>

    );
  }

export default page;