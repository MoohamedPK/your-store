import { getOrder } from "@/app/actions/admin/orders/getOrder";
import { OrderWithDetails } from "@/app/lib/definitions";
import BackButton from "@/components/adminCompo/orders/BackButton";
import CustomerInfo from "@/components/adminCompo/orders/CustomerInfo";
import OrderProductsTable from "@/components/adminCompo/orders/OrderProductsTable";
import { CancelOrderBtn, UpdateOrderBtn } from "@/components/adminCompo/orders/OrdersButtonActions";
import OrderSummary from "@/components/adminCompo/orders/OrderSummary";

const page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const orderId = (await params).orderId;
  const order = await getOrder(orderId) as OrderWithDetails;

  return (
    <main className="flex flex-col space-y-8 px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">

      {/* Header: Back + Actions */}
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <BackButton />

        <div className="flex justify-between sm:items-center gap-4">
          <CancelOrderBtn orderId={orderId} />
          <UpdateOrderBtn orderId={orderId} />
        </div>
      </header>

      {/* Order Summary + Customer Info */}
      <section>
        <h1 className="mb-6 text-lg font-semibold text-zinc-700">Order Summary</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Summary + Customer */}
          <div className="lg:col-span-2 space-y-6">
            <OrderSummary order={order} />
            <CustomerInfo order={order} />
          </div>

          {/* Right Side: Activity (empty for now) */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-zinc-700">Order Activity</h2>
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm text-zinc-500 text-center">
              No activity yet.
            </div>
          </div>
        </div>
      </section>

      {/* Ordered Products Table */}
      <section>
        <h2 className="mb-6 text-lg font-semibold text-zinc-700">Products in this Order</h2>
        <div className="overflow-x-auto">
          <OrderProductsTable order={order} />
        </div>
      </section>

    </main>
  );
};

export default page;
