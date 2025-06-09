import Category from "@/components/Category";
import Search from "@/components/common/Search";
import ProductsGrid from "@/components/ProductsGrid";
import { Suspense } from "react";

const Products = async (props : {searchParams?: Promise<{
  query?: string, category?: string
}>}) => {

  const searchPrams = await props.searchParams;
  const query = searchPrams?.query || "";
  const category = searchPrams?.category || "";

  return (
    <main className="h-screen container mt-10">
      <div>
        <Search/>
        <Category />

        <Suspense fallback={'loading...'}>
          {query && (
            <h1>search for {`"${query.toString()}"`}</h1>
          )}

          <ProductsGrid category={category} query={query}/>
        </Suspense>
      </div>
    </main>
  );
};

export default Products;