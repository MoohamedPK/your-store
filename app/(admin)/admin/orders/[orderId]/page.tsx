import { getOrder } from "@/app/actions/admin/getOrder";
import { OrderWithDetails } from "@/app/lib/definitions";
import BackButton from "@/components/adminCompo/orders/BackButton";
import CustomerInfo from "@/components/adminCompo/orders/CustomerInfo";
import { CancelOrderBtn, UpdateOrderBtn } from "@/components/adminCompo/orders/OrdersButtonActions";
import OrderSummary from "@/components/adminCompo/orders/OrderSummary";

const page = async ({params}: {params: Promise<{orderId: string}>}) => {

    const orderId = (await params).orderId;
    const order = await getOrder(orderId) as OrderWithDetails;

  return (
    <main className="flex flex-col space-y-8">

        <header className="flex justify-between items-center">
            <BackButton/>

            <div className="flex items-center space-x-8">
                <CancelOrderBtn orderId={orderId}/>
                <UpdateOrderBtn orderId={orderId}/>
            </div>
        </header>

        <section>
            <div className="mb-8 font-semibold text-lg text-zinc-700"><h1>Order Summary</h1></div>

            <div className="grid grid-cols-3 gap-x-6">

                <div className="left col-span-2 space-y-6">
                    <OrderSummary order={order}/>
                    <CustomerInfo order={order}/>
                </div>

                <div className="right">
                    <h1 className="mb-8 font-semibold text-lg text-zinc-700">Order Activity</h1>

                    <div>

                    </div>
                </div>
            </div>
        </section>

    </main>
  )
}

export default page