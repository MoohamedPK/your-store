import { allProducts } from "@/server/db/products"
import Product from "./common/Product";


const ProductsGrid = async ({category, query}: {category: string, query: string}) => {

    const products = await allProducts(category, query);
  return (
    <div>
        <div className="products grid grid-cols-3 gap-5 mt-20">
            {products.length === 0 ? (
                <p>No Products Found</p>
            ) : (
                products.map((product) => (
                    <Product product={product} key={product.id}/>
                ))
            )}
        </div>
    </div>
  )
}

export default ProductsGrid