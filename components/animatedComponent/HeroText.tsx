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
    <main className="h-screen flex items-center justify-center main-bg relative">
      <div className="branding_video absolute">
        <video src={"/branding-video (1).mp4"} autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover"/>
      </div>
        <div className="text-white/70 px-5 space-y-8 text-center md:text-start z-30">
            <h1 ref={textRef} className="text-5xl md:text-6xl lg:text-9xl bg-clip-text w-300">Effortless style, delivered.</h1>
            <p className="">Discover our latest collection of ethically sourced apparel and accessories.</p>

            <Link href={'/products'}>
              <button className="border border-white/60 flex items-center space-x-4 px-6 py-3 cursor-pointer button-hover group relative">
                  <span className="absolute top-0 left-0 size-full bg-white/60 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                  <p className="group-hover:text-black z-30 font-semibold">Shop the Look </p>
                  <ArrowUpRight size={26} className="opacity-0 group-hover:opacity-100 group-hover:text-black z-30"/>
              </button>
            </Link>
        </div>
    </main>
  )
}

export default HeroText