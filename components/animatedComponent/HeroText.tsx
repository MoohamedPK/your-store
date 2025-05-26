'use client'

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import {gsap} from "gsap"
import {SplitText} from "gsap/SplitText"
import { useRef, useEffect } from "react" // Add useEffect import

gsap.registerPlugin(SplitText)

const HeroText = () => {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Only run this code on the client after the component mounts
    if (textRef.current) {
      
      const split = new SplitText(textRef.current, {type: "words"})
      
      gsap.from(split.words, { // Use split.chars instead of split.lines
        y: 100,
        // x:-100,
        duration: 2,
        autoAlpha: 0,
        stagger: 0.05
      })

      // Cleanup function to revert the split when component unmounts
      return () => {
        split.revert()
      }
    }
  }, []) // Empty dependency array means this runs once after mount

  return (
    <main className="w-full h-screen flex justify-center items-center main-bg">
        <div className="text-white/70 px-5 space-y-8">
            <h1 ref={textRef} className="text-5xl md:text-7xl lg:text-9xl ">Modern Finds, Timeless Taste — Shop with Intention</h1>
            <p>Explore a curated selection of products that blend style, function, and simplicity, all in one seamless experience.</p>

            <Link href={'/products'}>
              <button className=" text-white/70 flex items-center text-xl px-8 py-3 space-x-5 group bg-zinc-900 cursor-pointer shadow button-hover">
                  <span>Shop Now</span>
                  <ArrowUpRight className="size-8 opacity-0 group-hover:opacity-100 transition-all duration-300"/>
              </button>
            </Link>
        </div>
    </main>
  )
}

export default HeroText