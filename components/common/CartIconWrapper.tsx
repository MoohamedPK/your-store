// import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getAuthSession } from "@/app/lib/auth";
import { getUserCart } from "@/app/actions/cart/user/getUserCart";
import { getGuestCart } from "@/app/actions/cart/guest/getGuestCart";
import { CartIcon } from "../CartIcon";

const CartIconWrapper = async ({}) => {
    const session = await getAuthSession();
    const cart = session?.user?.id ? await getUserCart() || []: await getGuestCart() || [];

    return <CartIcon session={session} userCart={cart.filter((item): item is NonNullable<typeof item> => item !== null)}/>
}

export default CartIconWrapper