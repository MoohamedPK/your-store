import CheckoutForm from "@/components/common/CheckoutForm";
import Subtotal from "@/components/common/Subtotal";
// import { auth } from "../api/auth/[...nextauth]/route";
import { getAuthSession } from "../lib/auth";
import { getUserCart } from "../actions/cart/user/getUserCart";
import { getGuestCart } from "../actions/cart/guest/getGuestCart";
import { calculateTotal } from "../lib/utils";

const Checkout = async () => {
  const session = await getAuthSession();

  const cart = session?.user?.id ? (await getUserCart()) || [] : (await getGuestCart()) || [];
  
  const filteredCart = cart.filter(
    (item): item is NonNullable<typeof item> => item !== null
  );
  const subTotal = calculateTotal(filteredCart);
  const fees = subTotal ? 5 : 0;
  const total = subTotal ? subTotal + fees : 0;

  return (
    <div className="container max-w-full px-4 py-8 bg-gray-400/55 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Delivery Details</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-start">
        <div className="md:col-span-2 w-full">
          <CheckoutForm
            total={total}
            fees={fees}
            subTotal={subTotal}
            cartItems={filteredCart}
          />
        </div>

        <div className="w-full">
          <Subtotal subTotal={subTotal} total={total} fees={fees} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
