import AnimatedTitle from "./AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryImages = [
    "gallery1.png",
    "gallery2.png",
    "gallery3.png",
    "gallery4.png",
    "gallery5.png",
  ];

  const galleryRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      const track = trackRef.current;

      if (!gallery || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".gallery-card",
        gallery
      );

      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        () => {
          // const isDesktop = context.conditions?.desktop;

          /*
           * -----------------------------------------
           * REAL dimensions
           * -----------------------------------------
           */

          const viewportWidth = window.innerWidth;

          const firstCard = cards[0];
          const lastCard = cards[cards.length - 1];

          if (!firstCard || !lastCard) return;

          const cardWidth =
            firstCard.getBoundingClientRect().width;

          const lastCardWidth =
            lastCard.getBoundingClientRect().width;

          const computedStyle =
            window.getComputedStyle(track);

          const gap =
            parseFloat(computedStyle.gap) || 0;

          /*
           * -----------------------------------------
           * START
           * -----------------------------------------
           *
           * First image must be centered.
           */

          const startX =
            viewportWidth / 2 - cardWidth / 2;

          /*
           * -----------------------------------------
           * END
           * -----------------------------------------
           *
           * Last image must be centered.
           */

          const totalTrackWidth =
            cardWidth * cards.length +
            gap * (cards.length - 1);

          const endX =
            viewportWidth / 2 -
            (totalTrackWidth - lastCardWidth / 2);

          /*
           * -----------------------------------------
           * Set initial track position
           * -----------------------------------------
           */

          gsap.set(track, {
            x: startX,
          });

          /*
           * -----------------------------------------
           * Initial card states
           * -----------------------------------------
           */

          gsap.set(cards, {
            opacity: 0.2,
            scale: 1,
            y: 0,
          });

          gsap.set(cards[0], {
            opacity: 1,
            scale: 1.05,
            y: -20,
          });

          /*
           * -----------------------------------------
           * Timeline
           * -----------------------------------------
           */

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: gallery,

              start: "center center",

              /*
               * Enough scroll distance for the
               * complete horizontal movement.
               */

              end: `+=${1800 * (cards.length - 1)}`,

              scrub: 1,

              pin: true,

              pinSpacing: true,

              anticipatePin: 1,

              invalidateOnRefresh: true,

              markers: false,
            },
          });

          /*
           * -----------------------------------------
           * Move the ENTIRE track continuously
           * from first centered → last centered
           * -----------------------------------------
           */

          timeline.to(
            track,
            {
              x: endX,
              duration: 1,
              ease: "none",
            }
          );

          /*
           * -----------------------------------------
           * Card focus animations
           * -----------------------------------------
           *
           * These happen at the same time as the
           * horizontal movement.
           */

          const progressPerCard =
            1 / (cards.length - 1);

          cards.forEach((card, index) => {
            if (index === 0) return;

            /*
             * When the gallery reaches this card,
             * make it active.
             */

            const start = progressPerCard * (index - 1);

            // const end = progressPerCard * index;

            timeline.to(
              cards[index - 1],
              {
                opacity: 0.2,
                scale: 1,
                y: 0,
                duration: progressPerCard,
                ease: "power2.inOut",
              },
              start
            );

            timeline.to(
              card,
              {
                opacity: 1,
                scale: 1.05,
                y: -20,
                duration: progressPerCard,
                ease: "power2.inOut",
              },
              start
            );
          });

          /*
           * -----------------------------------------
           * Refresh
           * -----------------------------------------
           */

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });

          /*
           * -----------------------------------------
           * Cleanup
           * -----------------------------------------
           */

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        }
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: galleryRef,
    }
  );

  return (
    <section
      ref={galleryRef}
      id="gallery"
      className="
        relative
        h-screen
        min-h-screen
        py-40
        text-center
        flex
        flex-col
        items-center
        max-md:pb-30
      "
    >
      {/* Background glow */}

      <div
        className="
          absolute
          w-[482.59px]
          h-[615.14px]
          rounded-[200px]
          blur-[180px]
          bottom-[25%]
          right-[-10%]
          max-lg:right-[-25%]
          max-md:right-[-50%]
          rotate-[67.37deg]
          opacity-70
          pointer-events-none
        "
        style={{
          background:
            "linear-gradient(135deg, #163B59 0%, #365C70 35%, #B56F62 70%, #F3C96A 100%)",
        }}
      />

      {/* Title */}

      <div
        className="
          relative
          z-10
          text-main
        "
      >
          <span className="small-title text-main-gredient">
            CAPTURE THE MOMENT
          </span>

          <AnimatedTitle
            title1="A COLLECTION OF"
            title2="JOURNEYS WORTH REMEMBERING"
            specialWord="JOURNEYS"
          />
        </div>

      {/* Gallery viewport */}

      <div
        className="
          relative
          w-full
          flex-1
          overflow-hidden
          min-h-screen
        "
      >
        {/* Track */}

        <div
          ref={trackRef}
          className="
            absolute
            top-25
            left-0
            flex
            items-start
            gap-[5vw]
            w-max
            will-change-transform
          "
        >
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className="
                gallery-card
                relative
                shrink-0
                w-[80vw]
                lg:w-[42vw]
                max-2xl:aspect-4/5
                rounded-2xl
                overflow-hidden
                will-change-transform
              "
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                className="
                  w-full
                  h-full
                  object-cover
                  object-center
                  select-none
                  pointer-events-none
                "
                draggable={false}
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-black/30
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;