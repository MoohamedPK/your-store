import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center main-bg">
        <div className="text-white/70 px-5 space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-9xl ">Modern Finds, Timeless Taste — Shop with Intention</h1>
            <p>Explore a curated selection of products that blend style, function, and simplicity, all in one seamless experience.</p>

            <Link href={'/products'}>
              <button className="flex items-center text-xl px-8 py-3 space-x-5 group bg-zinc-900 cursor-pointer shadow button-hover">
                  <span>Shop Now</span>
                  <ArrowUpRight className="size-8 opacity-0 group-hover:opacity-100 transition-all duration-300"/>
              </button>
            </Link>
        </div>
    </main>
  )
}

export default Hero