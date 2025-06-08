// app/cart/page.tsx (server component)
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getUserCart } from "@/app/actions/cart/user/getUserCart"
import CartProduct from "@/components/common/CartProduct";
import { getGuestCart } from "../actions/cart/guest/getGuestCart";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { calculateTotale } from "../lib/utils";

const page = async () => {
  const session = await auth();

  const cart = session?.user?.id ? await getUserCart() : await getGuestCart();
  const total = calculateTotale(cart.filter((item): item is NonNullable<typeof item> => item !== null))
  
    return (
      <div className="container grid grid-cols-4 gap-8 h-screen">
        <div className="col-span-3">
            {cart.length === 0 ? (
              <div>Your cart is Empty</div>
            ) : (
              cart
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.productId.localeCompare(b.productId))
      .map((item) => (
        <CartProduct key={item.productId + item.size} item={item} />
      ))
            )}
        </div>

            {cart.length !== 0 && (
              <div className="bg-black/90 text-white h-[40%] w-full text-center sticky top-25 flex flex-col justify-center gap-10 rounded-lg">

              <div className="bg-white/75 text-black font-semibold capitalize rounded-lg py-3 mx-2">
                <p>total price : {total} MAD</p>
              </div>


              <Link href={'/checkout'}>
                  <div className="button-hover bg-white/75 text-black font-semibold capitalize rounded-lg py-3 mx-2  flex items-center justify-center space-x-5">
                    <p>Checkout</p>
                    <ArrowRightIcon size={18}/>
                  </div>
              </Link>
            </div>
            )}
      </div>
    );
  }

export default page;