"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
const Search = () => {

    const searchPrams = useSearchParams();
    const {replace} = useRouter();
    const pathName = usePathname();

    const handleSearchValue = (term: string) =>  {
        
            const params = new URLSearchParams(searchPrams);
        
            if (term) {
                params.set("query", term)
            } else {
                params.delete('query');
            }
            replace(`${pathName}?${params.toString()}`)
    }

    return (
        <div className="bg-black text-white px-4 py-3 flex justify-center rounded-2xl my-4">
  <input
    type="text"
    placeholder="Search..."
    defaultValue={searchPrams.get('query')?.toString()}
    onChange={(e) => handleSearchValue(e.target.value)}
    className="w-full max-w-xl p-2 border border-white rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
  />
</div>

    )
}

export default Search