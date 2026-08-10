import AnimatedTitle from "./AnimatedTitle";
import CTA from "./CTA";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const planeRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const plane = planeRef.current;

      if (!plane) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop } = context.conditions!;

          const fromX = desktop ? 100 : 50;
          const fromY = desktop ? 30 : 20;

          // --------------------------------
          // Entrance
          // --------------------------------

          const intro = gsap.fromTo(
            plane,
            {
              opacity: 0,
              x: fromX,
              y: fromY,
              rotate: 2,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
              onComplete: () => {
                // --------------------------------
                // Subtle floating
                // --------------------------------

                gsap.to(plane, {
                  y: -8,
                  duration: 2.5,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: true,
                });
              },
            }
          );

          return () => {
            intro.scrollTrigger?.kill();
            intro.kill();

            gsap.killTweensOf(plane);
          };
        }
      );

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        w-9/10
        mx-auto
        mb-40

        rounded-2xl
        border
        border-white/5
        bg-[#050B12]

        overflow-visible

        px-20
        py-20

        flex
        items-center
        justify-between
        gap-16

        max-xl:px-14
        max-xl:gap-10

        max-lg:w-11/12
        max-lg:flex-col
        max-lg:items-center
        max-lg:px-12
        max-lg:py-16
        max-lg:gap-4

        max-md:px-8
        max-md:py-14

        max-sm:w-[92%]
        max-sm:px-6
        max-sm:py-12
        max-sm:rounded-xl
        max-sm:mb-24
      "
    >
      {/* --------------------------------
          Content
      -------------------------------- */}

      <div
        className="
          relative
          z-10
          text-main
          w-1/2

          max-xl:w-full
          max-xl:text-center

          max-xl:flex
          max-xl:flex-col
          max-xl:items-center
        "
      >
        <span className="small-title text-main-gredient">
          START YOUR JOURNEY
        </span>

        <AnimatedTitle
          title1="LET'S MAKE YOUR NEXT"
          title2="ADVENTURE UNFORGETTABLE"
          specialWord="UNFORGETTABLE"
        />

        <p
          className="
            text-lg
            mt-8
            max-w-2xl
            text-[#9AA9B8]

            max-xl:text-base

            max-lg:mx-auto
            max-lg:max-w-2xl

            max-md:mt-6
            max-md:text-sm
            max-md:max-w-xl

            max-sm:text-[13px]
            max-sm:leading-relaxed
            max-sm:max-w-sm
          "
        >
          Have a destination in mind or simply looking for inspiration? Tell
          us what you're dreaming of, and let's turn it into an unforgettable
          journey.
        </p>

        <div className="w-1/2">
            <CTA content="Contact Us" icon="msg" isHero={false} />
        </div>
      </div>

      {/* --------------------------------
          Airplane
      -------------------------------- */}

      <div
        className="
          relative
          z-10

          w-[48%]

          flex
          items-center
          justify-end

          pointer-events-none

          max-xl:hidden
        "
      >
        <img
          ref={planeRef}
          src="contact.png"
          alt="Airplane flying toward the horizon"
          loading="lazy"
          className="
            block
            w-[115%]
            max-w-none

            object-contain
            select-none
          "
          draggable={false}
        />
      </div>
    </section>
  );
};

export default Contact;