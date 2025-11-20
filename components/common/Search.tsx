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
    <div className="flex justify-center px-4">
    <div className="relative w-full max-w-2xl">
        <input
        type="text"
        placeholder="Search products..."
        defaultValue={searchPrams.get('query')?.toString()}
        onChange={(e) => handleSearchValue(e.target.value)}
        className="w-full px-6 py-4 border border-gray-300 bg-white text-black placeholder-gray-500 rounded-none focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200 text-lg font-light tracking-wide"
        />
        
        {/* Search icon */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
        </svg>
        </div>
    </div>
    </div>

    )
}

export default Search