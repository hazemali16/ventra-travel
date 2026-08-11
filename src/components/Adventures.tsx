
import gsap from "gsap"
import AnimatedTitle from "./AnimatedTitle"
import { useRef, type MouseEvent } from "react"

const Adventures = () => {
  const adventuresRef =  useRef<HTMLDivElement | null>(null)

  const handelMouseLeave = () => {
      const ele = adventuresRef.current
gsap.to(ele, {
  duration: 0.4,
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  ease: "power3.out",
  overwrite: true,
});
  }

    const handelMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const {clientX, clientY} = e
    const ele = adventuresRef.current
    

    if (!ele) return;

    const rest = ele.getBoundingClientRect()


    const x = clientX - rest.left;
    const y = clientY - rest.top;

    
    const centerX = rest.width / 2
    const centerY = rest.height / 2
    const rotateX = ((y - centerY) / centerY) * -15
    const rotateY = ((x - centerX) / centerX) * 15

gsap.to(ele, {
  duration: 0.3,
  ease: 'power3.out',
  scale: 1.03,
  rotateX,
  rotateY,
  overwrite: true,
});
  }

  return (
  <section className="bg-[#07111C] relative py-40 text-center flex flex-col items-center max-md:pb-30" id="adventures">
  <div
    className="
      absolute
      w-[482.59px]
      h-[615.14px]
      rounded-[200px]
      blur-[180px]
      top-[25%]
      left-[-10%]
      max-lg:left-[-25%]
      max-md:left-[-50%]
      rotate-[67.37deg]
      opacity-70
    "
    style={{
      background:
        "linear-gradient(135deg, #163B59 0%, #365C70 35%, #B56F62 70%, #F3C96A 100%)",
    }}
  />
            <div className="md:mb-10 text-main">
              <div className="relative z-10 mix-blend-difference">
              <span className="small-title text-main-gredient">EMBRACE THE JOURNEY</span>
            <AnimatedTitle title1="CHASE THE UNKNOWN" title2="LIVE THE EXTRAORDINARY" specialWord="EXTRAORDINARY" />
              </div>
            <div className="-mt-25 max-lg:-mt-20 max-md:-mt-10 rounded-2xl overflow-hidden max-w-9/10 mx-auto relative perspective-midrange" ref={adventuresRef}>
              <img 
              onMouseLeave={handelMouseLeave}
              onMouseMove={handelMouseMove}
              src="adventures.png" 
              className="w-full h-full object-center object-cover" 
              loading="lazy"
              alt="Adventures" />
            </div>
            </div>
</section>
  )
}

export default Adventures