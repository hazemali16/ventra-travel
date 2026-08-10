const Footer = () => {
  return (
    <footer
      className="
        w-full
        h-20
        border-t
        border-white/5
        bg-[#050B12]
        text-main
        flex
        items-center
        justify-center
        text-sm
        max-sm:text-xs
      "
    >
      <span>Created by</span>

      <span className="text-main-gredient font-bold mx-1">
        Hazem Ali
      </span>

      <span>&amp; Ventra Travel.</span>
    </footer>
  );
};

export default Footer;