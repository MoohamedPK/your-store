
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
  console.log("client side Cart:", cart)
  const total = calculateTotal(cart.filter((item): item is NonNullable<typeof item> => item !== null))
  
    return (
<div className="container px-4 grid grid-cols-1 md:grid-cols-4 gap-8 min-h-screen">
  {/* Cart Items Section */}
  <div className="md:col-span-3 space-y-4">
    {cart.length === 0 ? (
      <div className="text-xl capitalize font-semibold">Your cart is empty</div>
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
    <div className="bg-black/90 text-white w-full rounded-lg p-6 flex flex-col justify-between gap-6 md:sticky md:top-24 h-fit">
      <div className="bg-white/80 text-black font-semibold capitalize rounded-lg py-3 px-4 text-center">
        <p>Total Price: {total} MAD</p>
      </div>

      <Link href="/checkout">
        <div className="button-hover bg-white/80 text-black font-semibold capitalize rounded-lg py-3 px-4 flex items-center justify-center space-x-3">
          <p>Checkout</p>
          <ArrowRightIcon size={18} />
        </div>
      </Link>
    </div>
  )}
</div>

    );
  }

export default page;