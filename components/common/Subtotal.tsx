
const Subtotal = ({subTotal, total, fees}: {subTotal: number, total: number, fees:number}) => {

  return (
    <div className="w-full space-y-8 h-full">
        <div className="flex justify-around ">
            <p>Subtotal:</p>
            <span>{subTotal} MAD</span>
        </div>

        <hr />

        <div className="flex justify-around ">
            <p>Fees:</p>
            <span>{fees} MAD</span>
        </div>

        <hr />

        <div className="flex justify-around ">
            <p>Total:</p>
            <span>{total} MAD</span>
        </div>

        
    </div>
  )
}

export default Subtotal