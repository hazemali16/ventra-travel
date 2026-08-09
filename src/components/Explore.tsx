import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import AnimatedTitle from './AnimatedTitle'

import { ScrollTrigger, SplitText } from "gsap/all";

import ExploreInfo from "./ExploreInfo";

gsap.registerPlugin(ScrollTrigger, SplitText);


const Explore = () => {
const imagesData: {
  id: string;
  src: string;
  smallTitle: string;
  bigTitle: string;
  description: string;
}[] = [
  {
    id: "explore1",
    src: "explore1.png",
    smallTitle: "Mountain Escape",
    bigTitle: "Chasing Peaks",
    description:
      "Follow winding roads into the mountains, where towering peaks, quiet lakes, and endless horizons turn every mile into an unforgettable adventure.",
  },
  {
    id: "explore2",
    src: "explore2.png",
    smallTitle: "Forest Escape",
    bigTitle: "Into the Wild",
    description:
      "Wander beneath ancient trees, follow hidden paths, and discover the quiet beauty of places where nature remains untouched.",
  },
  {
    id: "explore3",
    src: "explore3.png",
    smallTitle: "Island Escape",
    bigTitle: "Where the Ocean Calls",
    description:
      "Escape to crystal-clear waters, hidden islands, and golden shores where every horizon invites you to slow down, breathe deeper, and discover a world beyond the ordinary.",
  },
];
    useGSAP(() => {
        const exploreTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#explore',
                start: 'center center',
                end: `+=${1500 * imagesData.length} center`,
                scrub: .5,
                pin: true,
                pinSpacing: true
            }
        })
        exploreTimeLine.to('#explore-clip', {
            width: "100vw",
            height: "100vh",
            borderRadius: '0',
        })
imagesData.forEach((image, index) => {
  if (image.id !== "explore1") {
    // Hide previous destination information
    exploreTimeLine.to(`#${imagesData[index - 1].id}`, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Bring in the next image
    exploreTimeLine
      .set(`#${image.id}Image`, {
        opacity: 0,
        zIndex: (( index + 1) * 10) + 10,
      })
      .to(`#${image.id}Image`, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      });
  }

  // Show current destination information
  exploreTimeLine.to(`#${image.id}`, {
    opacity: 1,
    duration: 1,
    ease: 'power2.inOut'
  });
    const titleSplit = new SplitText(`#${image.id}H3`, {
        type: "words",
      });

      exploreTimeLine.from(titleSplit.words, {
      opacity: 0,
      x: 30,
      y: 40,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.08,
  });

    const descriptionSplit = new SplitText(`#${image.id}P`, {
        type: "lines",
      });

exploreTimeLine.from(descriptionSplit.lines, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.08,
  });
});
    }, [])
  return (
    <>
        <section className="relative h-screen mt-30 py-10 text-center flex flex-col items-center max-md:pb-30" id="explore">
            <div className="md:mb-10">
            <span className="small-title text-main-gredient">DISCOVER EXTRAORDINARY PLACES</span>
            <AnimatedTitle title1="Explore the World's" title2="Most Breathtaking Destinations" />
            </div>
            <p className="text-lg leading-relaxed max-w-2xl text-slate-600 max-lg:text-base max-lg:max-w-xl mt-auto max-sm:max-w-lg max-sm:text-sm">Discover handpicked destinations where breathtaking landscapes, unforgettable adventures, and authentic experiences come together to create memories that last a lifetime.</p>
            <div className="absolute left-1/2 top-1/2 -translate-1/2" >
            <div className=" size-200 max-lg:size-190 max-md:size-170 max-sm:size-80 rounded-2xl overflow-hidden" id="explore-clip">
                {imagesData.map((image, index) => (
                    <>
                    <img className={`object-cover object-center min-w-full min-h-full absolute top-0 left-0`} style={{ zIndex: (imagesData.length * 10) - (index * 10) }} src={image.src} alt={image.smallTitle} key={index} id={image.id + 'Image'} />
                    <ExploreInfo smallTitle={image.smallTitle} bigTitle={image.bigTitle} description={image.description} id={image.id} />
                    </>
                ))}
            </div>
            </div>
            
    </section>
    </>
  )
}

export default Explore