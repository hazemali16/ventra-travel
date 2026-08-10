import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AnimatedTitle = ({title1, title2 = "", specialWord}: {title1: string; title2: string; specialWord: string}) => {
  const animatedTitle = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (!animatedTitle.current) return;

    // Split the title into words
    const splitTitle = new SplitText(animatedTitle.current, {
      type: "lines, words",
    });

    // Find the "Breathtaking" word
    const gradientWord = splitTitle.words.find(
      (word) => word.textContent?.trim() === specialWord
    );

    // Add the gradient class to "Breathtaking"
    if (gradientWord) {
      gradientWord.classList.add("text-main-gredient");
    }

    // Create animation
    const titleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: animatedTitle.current,
        start: "100 bottom",
        end: "center bottom",
        toggleActions: "play none none reverse",
      },
    });

    titleTimeline.from(splitTitle.words, {
      opacity: 0,
      x: 30,
      y: 30,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.08,
    });

    // Cleanup
    return () => {
      splitTitle.revert();
    };
  }, []);

  return (
    <h2 ref={animatedTitle} className="big-title mt-8 capitalize ">
      {title1} <br/> {title2}
    </h2>
  );
};

export default AnimatedTitle;