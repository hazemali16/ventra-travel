const ExploreInfo = ({
    smallTitle,
    bigTitle,
    description,
    id,
}: {
    smallTitle: string;
    bigTitle: string;
    description: string;
    id: string;
}) => {
    return (
        <div
            className="absolute inset-0 z-40 pointer-events-none opacity-0"
            id={id}
        >
            {/* Fajr glow */}
            <div
                className="
          absolute
          w-120.5
          h-153.75
          rounded-[200px]
          blur-[180px]
          top-[25%]
          left-[-10%]
          max-lg:left-[-25%]
          max-md:left-[-50%]
          rotate-[67.37deg]
          opacity-70
        "
                style={{
                    background:
                        "linear-gradient(135deg, #163B59 0%, #365C70 35%, #B56F62 70%, #F3C96A 100%)",
                }}
            />

            {/* Dark overlay for readability */}
            <div
                className="
          absolute
          inset-0
          bg-linear-to-r
          from-[#07111C]/80
          via-[#07111C]/30
          to-transparent
        "
            />

            {/* Content */}
            <div
                className="
          absolute
          left-[8%]
          top-1/2
          -translate-y-1/2
          z-10
          text-left
          max-w-lg
        "
            >
                <span className="text-xs uppercase tracking-[0.35em] text-[#D9A06A]">
                    {smallTitle}
                </span>

                <h3
                    className="
            mt-2
            text-2xl
            md:text-5xl
            font-bold
            uppercase
            tracking-[0.12em]
            text-main
          "
                    id={id + "H3"}
                >
                    {bigTitle}
                </h3>

                <p
                    className="
            mt-4
            max-w-md
            text-sm
            md:text-base
            leading-relaxed
            tracking-wide
            text-white/70
          "
                    id={id + "P"}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ExploreInfo;
