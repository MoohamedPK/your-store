import Category from "@/components/Category";
import Search from "@/components/common/Search";
import ProductsGrid from "@/components/ProductsGrid";
import { Suspense } from "react";

const Products = async (props: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";

  return (
    <main className="min-h-screen container px-4 mt-10">
      <div className="flex flex-col gap-6">
        {/* Search Bar */}
        <div>
          <Search />
        </div>

        {/* Category Filters */}
        <div>
          <Category />
        </div>

        {/* Search Result Heading */}
        <Suspense fallback={<p>Loading...</p>}>
          {query && (
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Search results for <span className="italic">{query}</span>
            </h1>
          )}

          {/* Products Grid */}
          <ProductsGrid category={category} query={query} />
        </Suspense>
      </div>
    </main>
  );
};

export default Products;
