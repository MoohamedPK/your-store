// app/cart/page.tsx (server component)
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getUserCart } from "@/app/actions/cart/user/getUserCart"
import CartProduct from "@/components/common/CartProduct";
import { getGuestCart } from "../actions/cart/guest/getGuestCart";

const page = async () => {
  const session = await auth();

  const cart = session?.user.id ? await getUserCart() : await getGuestCart();

    return (
      <div className="container">
        {cart.length === 0 ? (
          <div>Your cart is Empty</div>
        ) : (
          cart
  .filter((item): item is NonNullable<typeof item> => item !== null)
  .sort((a, b) => a.productId.localeCompare(b.productId)) // or by `createdAt` if available
  .map((item) => (
    <CartProduct key={item.productId + item.size} item={item} />
  ))
        )}
      </div>
    );
  }

export default page;