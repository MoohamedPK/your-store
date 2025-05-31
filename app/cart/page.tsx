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

export default page