import { ArrowUpRight } from "lucide-react"

const Hero = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center orange-bg">
        <div className="text-white px-5 space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-9xl ">Modern Finds, Timeless Taste — Shop with Intention</h1>
            <p>Explore a curated selection of products that blend style, function, and simplicity, all in one seamless experience.</p>

            <button className="flex items-center text-xl px-8 py-3 bg-black space-x-5 group cursor-pointer">
                <span>Shop Now</span>
                <ArrowUpRight className="size-8 opacity-0 group-hover:opacity-100 transition-all duration-300"/>
            </button>
        </div>
    </main>
  )
}

export default Hero