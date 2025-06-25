"use client"
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const Category = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

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
  {["all", "accessories", "digital"].map((category) => (
    <button
      key={category}
      onClick={() => handleCategoryChange(category === "all" ? "" : category)}
      className={clsx(
        'capitalize border border-black px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap',
        'hover:bg-zinc-900 hover:text-white',
        {
          'bg-zinc-900 text-white': searchParams.get("category") === category || (category === "all" && !searchParams.get("category")),
        }
      )}
    >
      {category}
    </button>
  ))}
</div>

  )
}


export default Category