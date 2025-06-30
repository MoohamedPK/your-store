import { prisma } from "@/app/lib/prisma"
import BackButton from "@/components/adminCompo/orders/BackButton"
import NewProductForm from "@/components/adminCompo/product/NewProductForm"

const page = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="container flex flex-col space-y-5">
      <BackButton/>

      <div className="text-xl font-semibold">
        <h1>Add New Product</h1>
      </div>

      <div className="grid grid-cols-2">
        <NewProductForm categories = {categories}/>

      </div>
    </div>
  )
}

export default page