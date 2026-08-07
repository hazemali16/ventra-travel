import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)


const Explore = () => {
    useGSAP(() => {
        const exploreTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#explore',
                start: 'top center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })
        exploreTimeLine.set('#explore-clip', {
            x: "-50%",
            y: "-50%",
        })
        exploreTimeLine.to('#explore-clip', {
            width: "100vw",
            height: "100vh",
            borderRadius: '0',
            
        })
    }, [])
  return (
    <section className="relative h-screen max-md:h-[80vh] mt-30 py-10 text-center flex flex-col items-center">
            <div className="">
            <span className="small-title text-main-gredient">DISCOVER EXTRAORDINARY PLACES</span>
            <h2 className="big-title mt-8 max-md:mb-20 max-sm:mt-3">Explore the World's <br />
            Most <span className="text-main-gredient">Breathtaking</span> Destinations</h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl text-slate-600 max-lg:text-base max-lg:max-w-xl md:mb-15 mt-auto max-sm:text-sm">Discover handpicked destinations where breathtaking landscapes, unforgettable adventures, and authentic experiences come together to create memories that last a lifetime.</p>
            <div className="absolute left-1/2 top-1/2" id="explore">
            <div className="size-200 max-lg:size-180 max-md:size-130 max-sm:size-70 rounded-xl overflow-hidden" id="explore-clip">
                <img className="object-cover object-center min-w-full min-h-full" src={'explore1.png'} alt="Mountain" />
            </div>
            </div>
            
    </section>
  )
}

export default Explore