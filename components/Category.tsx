"use client"

import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const Category = ({categories}: {categories: {id: string, name: string, slug: string}[]}) => {
    
    console.log(categories)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const currentCategory = searchParams.get("category");

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);

        if (category) {
            params.set("category", category)
        } else {
            params.delete("category")
        }

        replace(`${pathname}?${params.toString()}`);
    }

  return (
    <div className="categories flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-8 overflow-x-auto px-4">
  <button
    onClick={() => handleCategoryChange("")}
    className={clsx(
      "capitalize border border-gray-400 px-5 py-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-sm tracking-wide",
      "hover:bg-black hover:text-white hover:border-black",
      {
        "bg-black text-white border-black": !currentCategory,
      }
    )}
  >
    All Products
  </button>
  
  {categories.map((category) => (
    <button
      key={category.id}
      onClick={() => handleCategoryChange(category.slug)}
      className={clsx(
        'capitalize border border-gray-400 px-5 py-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-sm tracking-wide',
        'hover:bg-black hover:text-white hover:border-black',
        {
          'bg-black text-white border-black': currentCategory === category.slug,
        }
      )}
    >
      {category.name}
    </button>
  ))}
</div>

  )
}


export default Category