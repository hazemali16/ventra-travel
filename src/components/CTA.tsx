import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

const CTA = ({
  content,
  icon,
  isHero,
}: {
  content: string;
  icon: string;
  isHero: boolean;
}) => {
  const CTALink = useRef<HTMLAnchorElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const link = CTALink.current;
    const text = textRef.current;
    const iconElement = iconRef.current;

    if (!link || !text || !iconElement) return;

    // Initial entrance
    gsap.fromTo(
      link,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 2.5,
        ease: "power3.out",
      }
    );

    // Initial state
    gsap.set(text, {
      opacity: 0,
      x: -10,
      width: 0,
    });

    // Hover
    const handleEnter = () => {
      gsap.to(link, {
        width: "auto",
        paddingLeft: 24,
        paddingRight: 24,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.set(text, {
        marginRight: '10px',
      })
      gsap.to(text, {
        opacity: 1,
        x: 0,
        width: "auto",
        duration: 0.35,
        delay: 0.08,
        ease: "power3.out",
      });

      gsap.to(iconElement, {
        rotate: icon === "arrow" ? 0 : -8,
        scale: 1.05,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    // Leave
    const handleLeave = () => {
      gsap.to(text, {
        opacity: 0,
        x: -10,
        width: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.set(text, {
        marginRight: 0,
      })

      gsap.to(link, {
        width: 52,
        paddingLeft: 0,
        paddingRight: 0,
        duration: 0.7,
        ease: "power3.inOut",
      });

      gsap.to(iconElement, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    link.addEventListener("mouseenter", handleEnter);
    link.addEventListener("mouseleave", handleLeave);

    return () => {
      link.removeEventListener("mouseenter", handleEnter);
      link.removeEventListener("mouseleave", handleLeave);
    };
  });

  return (
    <a
      ref={CTALink}
      href={isHero ? "#explore" : "#"}
      className="
        CTA-hero
        mt-10
        h-13
        w-13
        overflow-hidden
        rounded-full
        flex
        items-center
        justify-center
        whitespace-nowrap
        font-bold
        text-[#102233]
        will-change-[width]
        max-md:h-12
        max-md:w-12
      "
    >
      <span
        ref={textRef}
        className="overflow-hidden"
      >
        {content}
      </span>

      <span
        ref={iconRef}
        className="shrink-0 flex items-center justify-center"
      >
        {icon === "arrow" ? <FaArrowDown /> : <FiSend />}
      </span>
    </a>
  );
};

export default CTA;