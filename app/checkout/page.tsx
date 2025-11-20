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
    <div className="w-full px-4 sm:px-6 py-12 bg-white min-h-screen">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <header className="mb-12 border-b border-gray-200 pb-6">
      <h1 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">Delivery Details</h1>
    </header>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      {/* Checkout Form - Main Content */}
      <div className="lg:col-span-2 w-full">
        <CheckoutForm
          total={total}
          fees={fees}
          subTotal={subTotal}
          cartItems={filteredCart}
        />
      </div>

      {/* Order Summary - Sidebar */}
      <div className="w-full lg:sticky lg:top-8">
        <div className="border border-gray-200 bg-white p-6">
          <Subtotal subTotal={subTotal} total={total} fees={fees} />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Checkout;
