import Category from "@/components/Category";
import Product from "@/components/common/Product";
import { allProducts } from "@/server/db/products";

const Products = async ({
  searchParams,
}: {searchParams: Promise<{ category?: string }>}) => {

  const params = await searchParams;
  const category = params?.category;
  const products = await allProducts(category);

  return (
    <main className="h-screen container mt-10">
      <div>
        <Category />

        <div className="products grid grid-cols-3 gap-5 mt-20">
          {products.map((product) => (
            <Product product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;