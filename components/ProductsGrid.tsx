import { allProducts } from "@/server/db/products";
import Product from "./common/Product";

const ProductsGrid = async ({ category, query }: { category: string; query: string }) => {
  
  const products = await allProducts(category, query);

  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-lg">No Products Found</p>
        ) : (
          products.map((product) => (
            <Product product={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;
