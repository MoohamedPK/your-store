"use client"

import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import {SplitText} from "gsap/SplitText"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(SplitText, ScrollTrigger)

const HeadingTitle = ({title}: {title: string}) => {

  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {

    if (!titleRef.current ) return;

    const splittedText = SplitText.create(titleRef.current, {type: "chars"});

    gsap.from(splittedText.chars, {
      yPercent: 100,
      opacity: 0,
      satgger: 0.06,
      ease: "power2.out",
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    return () => splittedText.revert()
  }, [])

  return (
      <div className="text-center pt-32 text-3xl font-bold">
          <h1 ref={titleRef}>{title}</h1>
      </div>
  )
}

export default HeadingTitle