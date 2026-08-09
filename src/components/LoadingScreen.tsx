type LoadingScreenProps = {
  progress: number;
};

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#07111C] text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-[0.2em]">
          VENTRA
        </h1>

        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/50">
          Preparing your journey
        </p>
      </div>

      <div className="w-64">
        <div className="mb-2 flex justify-between text-xs uppercase tracking-wider text-white/50">
          <span>Loading</span>
          <span>{progress}%</span>
        </div>

        <div className="h-[2px] w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-white transition-[width] duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;