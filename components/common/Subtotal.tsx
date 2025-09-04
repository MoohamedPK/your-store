const Subtotal = ({
  subTotal,
  total,
  fees,
}: {
  subTotal: number;
  total: number;
  fees: number;
}) => {
  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md space-y-6 text-gray-900">
      <div className="flex justify-between text-base font-medium">
        <p>Subtotal:</p>
        <span>{subTotal} MAD</span>
      </div>

      <hr className="border-gray-300" />

      <div className="flex justify-between text-base font-medium">
        <p>Fees:</p>
        <span>{fees} MAD</span>
      </div>

      <hr className="border-gray-300" />

      <div className="flex justify-between text-lg font-bold">
        <p>Total:</p>
        <span>{total} MAD</span>
      </div>
    </div>
  );
};

export default Subtotal;
