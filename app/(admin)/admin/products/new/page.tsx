import { prisma } from "@/app/lib/prisma"
import BackButton from "@/components/adminCompo/orders/BackButton"
import NewProductForm from "@/components/adminCompo/product/NewProductForm"
import RecentAddedProducts from "@/components/adminCompo/product/RecentAddedProducts"

const page = async () => {
  
  const categories = await prisma.category.findMany({
    orderBy: {name: "asc"},
    select: {
      id: true,
      name: true,
      slug: true
    }
  })

  return (
    <div className="flex flex-col space-y-5 p-4">
      <BackButton />

      <div className="text-xl font-semibold">
        <h1>Add New Product</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form takes 2/3 on md+, full width on mobile */}
        <div className="md:col-span-2">
          <NewProductForm categories={categories} />
        </div>

        {/* Recent products take 1/3 on md+, full width on mobile */}
        <div>
          <RecentAddedProducts />
        </div>
      </div>
    </div>
  )
}

export default page
