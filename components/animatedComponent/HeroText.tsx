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
        duration: 2,
        autoAlpha: 0,
        stagger: 0.05
      })
      
      return () => {
        split.revert()
      }
    }
  }, [])

  return (
    <main className="relative flex items-center justify-center overflow-hidden min-h-screen">
  {/* Background Video */}
  <div className="absolute inset-0 w-full h-full">
    <video
      src="/branding-video (1).mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-10"></div>

  {/* Content */}
  <div className="relative z-20 text-white/80 text-center w-full max-w-5xl px-4 sm:px-8 space-y-6 sm:space-y-8 lg:space-y-10 mx-auto">

    {/* Title */}
    <h1
      ref={textRef}
      className="
        font-light tracking-tight leading-[1.1]
        text-[clamp(2rem,6vw,5rem)]
        sm:text-[clamp(2.5rem,5vw,6rem)]
        md:text-[clamp(3rem,5vw,7rem)]
      "
    >
      Effortless style, delivered.
    </h1>

    {/* Subtitle */}
    <p className="
      font-light tracking-wide leading-relaxed mx-auto
      text-[clamp(0.9rem,2.2vw,1.3rem)]
      max-w-xl
    ">
      Discover our latest collection of ethically sourced apparel and accessories.
    </p>

    {/* CTA Button */}
    <div className="pt-4 sm:pt-6">
      <Link href="/products">
        <button
          className="
            relative mx-auto flex items-center justify-center
            border border-white/60 overflow-hidden group
            px-6 py-3 sm:px-8 sm:py-4
          "
        >
          {/* Hover background */}
          <span
            className="
              absolute inset-0 bg-white/60 scale-x-0
              group-hover:scale-x-100 origin-left
              transition-transform duration-300
            "
          />

          {/* Text */}
          <p
            className="
              relative z-20 font-medium tracking-wide
              text-sm sm:text-base group-hover:text-black
              transition-colors duration-300
            "
          >
            Shop the Look
          </p>

          {/* Arrow */}
          <ArrowUpRight
            className="
              relative z-20 ml-3 opacity-0
              group-hover:opacity-100 group-hover:text-black
              transition-all duration-300
              transform group-hover:translate-x-1 group-hover:-translate-y-1
            "
            size={20}
          />
        </button>
      </Link>
    </div>
  </div>
</main>

  )
}

export default HeroText