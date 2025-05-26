
import ClientProductDetails from "@/components/ClientProductDetails"
import { productById } from "@/server/db/products"

const ProductDetails = async ({params}: {params: {id: string}}) => {

  const product = await productById(params.id)
  
  if (!product) {
    return <div>Product not found</div>;
    //throw notFound()
  }

  return <ClientProductDetails product={product}/>
}

export default ProductDetails