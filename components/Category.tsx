"use client"
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
    <div className="categories flex justify-center items-center space-x-10">
        
        {["all", "accessories", "digital"].map((category) => (
            <button
            onClick={() => handleCategoryChange(category === "all" ? "" : category)}
            key={category} className="border capitalize border-black px-5 py-2 rounded-full button-hover cursor-pointer hover:bg-zinc-900 hover:text-white transition-all duration-300">
            {category}
        </button>
        ))}

    </div>
  )
}


export default Category