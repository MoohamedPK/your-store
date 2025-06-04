import HeadingTitle from "@/components/common/HeadingTitle"
import Product from "./common/Product";
import { featuredProducts } from "@/server/db/products";

const Featured = async() => {
    
  const featuredProds = await featuredProducts()
  
  return (
    <main className="h-[130dvh] relative">
      
      <HeadingTitle title="Featured Products"/>
      
      <div className="mt-15 grid grid-cols-3 gap-3 container">
        {featuredProds.map((product) => (
<<<<<<< Updated upstream
          <Product key={product.id} product={product} />
=======
          <Product key={product.id} product={product}/>
>>>>>>> Stashed changes
        ))}
        
      </div>
    </main>
  )
}

export default Featured