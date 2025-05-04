import HeadingTitle from "@/common/HeadingTitle"
import { prisma } from "@/lib/prisma"
import Product from "./Product";

const Recommanded = async() => {
    const prods = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc" // take the last created prods 
      },
      take: 3, // give me a limit of 5 prods
      
    });

  return (
    <main className="h-[130dvh] relative">
      
      <HeadingTitle title="Featured Products"/>
      <div className="mt-15 grid grid-cols-3 gap-3 container">
        {prods.map((product) => (
          <Product key={product.id} product={product}/>
        ))}
        
      </div>
    </main>
  )
}

export default Recommanded