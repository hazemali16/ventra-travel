import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import CTA from "./CTA";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setloadedVideos] = useState(0);
  const totalVideos: number = 3;
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const isLoading = loadedVideos < totalVideos - 1;
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", {
          visibility: "visible",
        });
        gsap.to("#next-video", {
          scale: 1,
          width: "100%",
          height: "100%",
          transformOrigin: "center center",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play();
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          duration: 1.5,
          ease: "power1.inOut",
          scale: 0,
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );
  useGSAP(() => {
    gsap.set("#videoframe", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 100%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#videoframe", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#videoframe",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handelMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };
  const getVideoSrc = (index: number) => `videos/${index}.mp4`;

  const handelVideoLoad = () => {
    setloadedVideos((prev: number) => prev + 1);
  };

  return (
    <div className="overflow-hidden w-screen h-dvh relative" id="home">
      {isLoading && (
        <div className="w-full h-dvh flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      <div
        id="videoframe"
        className="w-screen rounded-lg overflow-hidden relative z-10 h-dvh bg-blue-100"
      >
        <div>
          <div className="absolute-center z-50 cursor-pointer max-xl:size-64 size-100 overflow-hidden rounded-lg">
            <div
              onClick={handelMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                className="max-xl:size-64 size-100 object-center scale-150 object-cover"
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                autoPlay
                id="current-video"
                onLoadedData={handelVideoLoad}
              />
            </div>
          </div>
          <video
            loop
            muted
            className="object-cover object-center size-64 z-20 absolute-center invisible"
            id="next-video"
            onLoadedData={handelVideoLoad}
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
          />
          <video
            loop
            muted
            autoPlay
            className="object-cover object-center absolute top-0 left-0 size-full"
            id=""
            onLoadedData={handelVideoLoad}
            src={getVideoSrc(currentIndex)}
          />
        </div>
        <div
          className="absolute z-40 w-full top-0 left-1/2 -translate-x-1/2 h-dvh flex lg:items-center"
          style={{
            background: `
    linear-gradient(
      to bottom,
      rgba(5, 15, 25, 0.7) 0%,
      rgba(5, 15, 25, 0.35) 18%,
      transparent 45%
    ),
    linear-gradient(
      to right,
      rgba(8, 12, 18, 0.75) 0%,
      rgba(8, 12, 18, 0.45) 40%,
      rgba(8, 12, 18, 0.15) 70%,
      transparent 100%)`,
          }}
        >
          <div className="w-9/10 mx-auto">
            <div className="w-3/10 max-2xl:w-4/10 max-lg:w-4/5 max-lg:pt-80 max-md:pt-60">
              <h1 className="text-6xl text-main font-bold mb-15 uppercase max-2xl:text-5xl max-xl:text-4xl max-lg:mb-10 max-lg:text-2xl">
                Explore Beyond the{" "}
                <span className="text-main-gredient">Horizon</span>
              </h1>
              <div className="text-blue-100 leading-relaxed text-xl max-2xl:text-lg font-bold max-xl:text-base max-lg:text-small max-md:text-xs">
                <p className="mb-5">
                  Ventra Travel creates unforgettable journeys through the
                  world's most breathtaking landscapes, from tranquil forests
                  and majestic mountains to endless ocean horizons.
                </p>
                <p className="">
                  Every destination is carefully chosen to inspire adventure,
                  reconnect you with nature, and turn every trip into a story
                  worth remembering.
                </p>
              </div>
              <CTA content="Start Exploring" />
            </div>
          </div>
        </div>
        <div
          className="absolute z-40 bottom-30 right-30 text-6xl max-2xl:text-5xl font-bold text-center max-xl:text-4xl max-xl:bottom-10 max-md:right-10 max-md:text-2xl"
          style={{ color: "rgba(255,248,238,.5)" }}
        >
          <span>
            VENTRA
            <br /> TRAVEL
          </span>
        </div>
      </div>
      <div className="absolute bottom-30 right-30 text-6xl max-2xl:text-5xl font-bold text-center text-black max-xl:text-4xl max-xl:bottom-10 max-md:right-10 max-md:text-2xl">
        <span className="font-bold text-center">
          VENTRA
          <br /> TRAVEL
        </span>
      </div>
    </div>
  );
};

export default Hero;
