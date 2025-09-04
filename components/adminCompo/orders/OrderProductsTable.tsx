import { OrderWithDetails } from "@/app/lib/definitions";
import { currancyFormatter } from "@/app/lib/formatters";
import Image from "next/image";

const OrderProductsTable = async ({ order }: { order: OrderWithDetails }) => {
  return (
    <main className="w-full">

      <div className="border-2 border-black/30 rounded-lg p-4 md:p-6 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-sm text-zinc-800 border-b">
              <th className="pb-2">Product</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Quantity</th>
              <th className="pb-2">Unit Price</th>
              <th className="pb-2">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((orderProduct) => (
              <tr
                key={orderProduct.id}
                className="border-b text-sm font-medium text-zinc-700"
              >
                <td className="py-2">
                  <Image
                    src={orderProduct.Product.image}
                    alt={orderProduct.Product.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                </td>
                <td>{orderProduct.Product.name}</td>
                <td>{orderProduct.quantity}</td>
                <td>{currancyFormatter(orderProduct.Product.price)}</td>
                <td>{new Date(orderProduct.Product.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrderProductsTable;
