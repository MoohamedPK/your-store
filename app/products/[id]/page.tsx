
import ClientProductDetails from "@/components/ClientProductDetails"
import { productById } from "@/server/db/products"

const ProductDetails = async ({params}: {params: Promise<{id: string}>}) => {

  const productId = (await params).id
  const product = await productById(productId)
  
  if (!product) {
    return <div>Product not found</div>;
    //throw notFound()
  }

  return <ClientProductDetails product={product}/>
}

export default ProductDetails