import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Explore from "./components/Explore";
import Adventures from "./components/Adventures";

const videoAssets = [
  "/videos/1.mp4",
  "/videos/2.mp4",
  "/videos/3.mp4",
];

const imageAssets = [
  "/explore1.png",
  "/explore2.png",
  "/explore3.png",
];

const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const handleLoaded = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      console.warn(`Failed to load video: ${src}`);
      cleanup();
      resolve();
    };

    const cleanup = () => {
      video.removeEventListener("canplaythrough", handleLoaded);
      video.removeEventListener("error", handleError);
    };

    video.addEventListener("canplaythrough", handleLoaded);
    video.addEventListener("error", handleError);

    video.src = src;
    video.load();
  });
};

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const image = new Image();

    const handleLoaded = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      console.warn(`Failed to load image: ${src}`);
      cleanup();
      resolve();
    };

    const cleanup = () => {
      image.removeEventListener("load", handleLoaded);
      image.removeEventListener("error", handleError);
    };

    image.addEventListener("load", handleLoaded);
    image.addEventListener("error", handleError);

    image.src = src;
  });
};

const preloadFonts = async (): Promise<void> => {
  try {
    // Wait for the browser's font loading process
    await document.fonts.ready;

    // Make sure fonts currently used by the document are loaded
    const fontPromises = [
      document.fonts.load("400 16px Sora"),
      document.fonts.load("500 16px Sora"),
      document.fonts.load("600 16px Sora"),
      document.fonts.load("700 16px Sora"),
    ];

    await Promise.all(fontPromises);

    // Final check
    await document.fonts.ready;
  } catch (error) {
    console.warn("Failed to load fonts:", error);
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedAssets, setLoadedAssets] = useState(0);

  const totalAssets =
    videoAssets.length +
    imageAssets.length +
    1;

  useEffect(() => {
    let isMounted = true;

    const assetLoaded = () => {
      if (isMounted) {
        setLoadedAssets((prev) => prev + 1);
      }
    };

    const loadAssets = async () => {
      const videosPromise = Promise.all(
        videoAssets.map(async (src) => {
          await preloadVideo(src);
          assetLoaded();
        })
      );

      const imagesPromise = Promise.all(
        imageAssets.map(async (src) => {
          await preloadImage(src);
          assetLoaded();
        })
      );

      const fontsPromise = preloadFonts().then(() => {
        assetLoaded();
      });

      await Promise.all([
        videosPromise,
        imagesPromise,
        fontsPromise,
      ]);

      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  const progress = Math.round(
    (loadedAssets / totalAssets) * 100
  );

  return (
    <>
      {isLoading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <main className="overflow-hidden">
          <Header />

          <Hero />

          <Explore />

          <Adventures />
        </main>
      )}
    </>
  );
}

export default App;