import CheckoutForm from "@/components/common/CheckoutForm"
import Subtotal from "@/components/common/Subtotal"
import { auth } from "../api/auth/[...nextauth]/route"
import { getUserCart } from "../actions/cart/user/getUserCart"
import { getGuestCart } from "../actions/cart/guest/getGuestCart"
import { calculateTotale } from "../lib/utils"

const Checkout = async () => {

  const session = await auth()
  const cart = session?.user?.id ? await getUserCart() : await getGuestCart();
  const subTotal = calculateTotale(cart.filter((item): item is NonNullable<typeof item> => item !== null))
  const fees = subTotal ? 5 : 0 ;
  const total = subTotal ? subTotal + fees : 0
  
  return (
    <div className="container h-[130dvh] bg-zinc-400/65">
        <div className="my-8">
            <h1>Delivery Details</h1>
        </div>

      <div className="grid grid-cols-3 gap-10 place-items-center">
        <CheckoutForm total={total} fees={fees} subTotal={subTotal} cartItems={cart.filter((item): item is NonNullable<typeof item> => item !== null)} />

        <Subtotal subTotal={subTotal} total={total} fees={fees}/>
      </div>
    </div>
  )
}

export default Checkout