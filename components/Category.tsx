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
    <div className="categories flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6 overflow-x-auto px-2">
      <button
        onClick={() => handleCategoryChange("")}
        className={clsx(
          "capitalize border border-black px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer",
          "hover:bg-zinc-900 hover:text-white",
          {
            "bg-zinc-900 text-white": !currentCategory,
          }
        )}
      >
        All
      </button>
  {categories.map((category) => (
    <button
      key={category.id}
      onClick={() => handleCategoryChange(category.slug)}
      className={clsx(
        'capitalize border border-black px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer',
        'hover:bg-zinc-900 hover:text-white',
        {
          'bg-zinc-900 text-white': currentCategory === category.slug,
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