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
        <div className=" bg-black text-white p-3 flex items-center justify-center rounded-2xl my-4">
            <input type="text" placeholder="search..." className="w-1/2 p-2 border my-5 rounded-lg" defaultValue={searchPrams.get('query')?.toString()} onChange={(e) => handleSearchValue(e.target.value)}/>
        </div>
    )
}

export default Search