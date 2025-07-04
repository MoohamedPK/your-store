import { getRecentlyProducts } from "@/app/actions/admin/products/getRecentlyProducts"
import { currancyFormatter } from "@/app/lib/formatters";
import Image from "next/image";

const RecentAddedProducts = async () => {

  const recentProducts = await getRecentlyProducts();
  
  return (
    <div className="bg-neutral-400/60 p-6 rounded-lg">
        <h1 className="mb-6 font-semibold text-zinc-800">
          Recently Added
        </h1>

        {recentProducts.length === 0 ? (
          <p className="text-sm text-gray-700/60">Not item added yet</p>
        ) : (
          <>
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-6 space-y-6">
                <div>
                  <Image src={product.image} width={50} height={50  } alt="product img" className="rounded-xl"/>
                </div>
    
                <div className="space-y-2">
                  <h1 className="text-sm font-semibold">{product.name}</h1>
                  <p className="text-xs font-semibold text-zinc-700">{currancyFormatter(product.price)}</p>
                </div>
              </div>
            ))}
          </>
        )}
    </div>
  )
}

export default RecentAddedProducts