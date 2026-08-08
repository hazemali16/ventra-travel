import { MdOutlineMenu } from "react-icons/md";
import { useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: string[] = [
    "home",
    "explore",
    "adventures",
    "gallery",
    "contact",
  ];

  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);

  const { y: currentScrollY } = useWindowScroll();

  useGSAP(() => {
    if (!headerRef.current) return;

    // At the top → always show
    if (currentScrollY === 0) {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        background: 'transparent',
        duration: 0.5,
        ease: "power2.out",
      });

      lastScrollY.current = currentScrollY;
      return;
    }

    // Scrolling down
    if (currentScrollY > lastScrollY.current) {
      gsap.to(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Scrolling up
    if (currentScrollY < lastScrollY.current) {
      gsap.set(headerRef.current, { position: 'fixed', backgroundColor: 'black'})
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    lastScrollY.current = currentScrollY;
  }, [currentScrollY]);

  return (
    <>
      <header
        ref={headerRef}
        className="
          absolute top-5 left-1/2 -translate-x-1/2
          z-70 w-9/10 py-3 px-7
          rounded-2xl
          flex justify-between items-center
        "
      >
        <a href="#home">
          <img
            className="max-lg:size-10"
            src="./logo.png"
            alt="Ventra Travel"
            width={80}
            height={80}
          />
        </a>

        <nav>
          <ul
            className="flex items-center gap-7 max-lg:hidden"
            style={{ color: "rgba(255,255,255,.75)" }}
          >
            {navLinks.map((link) => (
              <li
                key={link}
                className="
                  hover:text-[#FFF8EE]
                  transition-colors duration-300
                  capitalize
                "
              >
                <a
                  className="duration-300 relative navLink pb-3"
                  href={`#${link}`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <MdOutlineMenu
            className="lg:hidden size-8 text-main cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-80 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          <aside
            className="
              fixed right-0 top-0 h-full w-4/5 max-w-xs
              bg-[#0f1115]
              border-l border-white/10
              p-8 shadow-2xl
            "
          >
            <button
              className="
                absolute cursor-pointer top-5 right-5
                text-main-gredient
                font-bold text-3xl leading-none
                transition hover:text-white
              "
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>

            <ul
              className="
                flex h-full flex-col
                justify-center items-center
                gap-6 text-lg font-medium
              "
              style={{ color: "rgba(255,255,255,.92)" }}
            >
              {navLinks.map((link) => (
                <li
                  key={link}
                  className="
                    w-full rounded-full py-3
                    text-center transition
                    hover:bg-white/10
                    hover:text-[#FFF8EE]
                    capitalize
                  "
                >
                  <a
                    className="block w-full"
                    href={`#${link}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;