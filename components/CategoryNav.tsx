import { prisma } from "@/app/lib/prisma";
import Category from "./Category";

const CategoryNav = async () => {

  const categories = await prisma.category.findMany({
    orderBy: {name: "asc"},
    select: {
      id: true,
      name: true,
      slug: true
    }
  })

  return <Category categories ={categories}/>
}

export default CategoryNav