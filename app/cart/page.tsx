<<<<<<< Updated upstream
// app/cart/page.tsx (server component)
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getUserCart } from "@/app/actions/cart/user/getUserCart"
import CartProduct from "@/components/common/CartProduct";
import { getGuestCart } from "../actions/cart/guest/getGuestCart";

const page = async () => {
  const session = await auth();
=======
import CartProduct from "@/components/common/CartProduct";
import { getGuestCart } from "../actions/cart/guest/getGuestCart";
import { getUserCart } from "../actions/cart/user/getUserCart"
import { auth } from "../api/auth/[...nextauth]/route"
import { cartProducts } from "@/server/db/products";
import { CartProductsType } from "../lib/definitions";

const page = async () => {

  let products = [] as CartProductsType[];

  const session = await auth();

  if (session?.user.email) {
    const cartItems = await getUserCart()
    const productIds = cartItems.map((item) => item.productId);
      products = await cartProducts(productIds)
  } else {
    const guestCart = await getGuestCart()
     products = guestCart.items;
  }


  return (
    <div className="container">
      {products.map((product) => <CartProduct key={product.id} product={product}/>)}
    </div>
  )
}
>>>>>>> Stashed changes

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