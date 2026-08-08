import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)


const Explore = () => {
    useGSAP(() => {
        const exploreTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#explore',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })
        exploreTimeLine.to('#explore-clip', {
            width: "100vw",
            height: "100vh",
            borderRadius: '0',
        })
    }, [])
  return (
    <section className="relative h-screen mt-30 py-10 text-center flex flex-col items-center max-md:pb-30" id="explore">
            <div className="md:mb-10">
            <span className="small-title text-main-gredient">DISCOVER EXTRAORDINARY PLACES</span>
            <h2 className="big-title mt-8">Explore the World's <br />
            Most <span className="text-main-gredient">Breathtaking</span> Destinations</h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl text-slate-600 max-lg:text-base max-lg:max-w-xl mt-auto max-sm:max-w-lg max-sm:text-sm">Discover handpicked destinations where breathtaking landscapes, unforgettable adventures, and authentic experiences come together to create memories that last a lifetime.</p>
            <div className="absolute left-1/2 top-1/2 -translate-1/2" >
            <div className=" size-200 max-lg:size-190 max-md:size-170 max-sm:size-120 rounded-2xl overflow-hidden" id="explore-clip">
                <img className="object-cover object-center min-w-full min-h-full" src={'explore1.png'} alt="Mountain" />
            </div>
            </div>
            
    </section>
  )
}

export default Explore