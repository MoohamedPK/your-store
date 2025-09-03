import HeadingTitle from "@/components/animatedComponent/HeadingTitle"
import Product from "./common/Product";
import { featuredProducts } from "@/server/db/products";

const Featured = async() => {
    
  const featuredProds = await featuredProducts()
  
  return (
    <main className="h-[130dvh] relative">
      
      <HeadingTitle title="Featured Products"/>
      
      <div className="mt-15 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 flex-nowrap gap-3 container">
        {featuredProds.map((product) => (
          <Product key={product.id} product={product}/>
        ))}
        
      </div>
    </main>
  )
}

export default Featured