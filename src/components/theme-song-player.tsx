"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const HERO_IMAGE_SRC = "/casade-hero.jpg";
const LANDING_VIDEO_SRC = "/casa-logo-video.mp4";

export default function ThemeSongPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const playLandingVideo = async () => {
    setIsVideoVisible(true);

    // Wait until the video element is mounted after state update.
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(undefined);
      });
    });

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    await video.play();
  };

  return (
    <div className="relative aspect-square w-full max-w-[960px] bg-black">
      {isVideoVisible ? (
        <video
          ref={videoRef}
          src={LANDING_VIDEO_SRC}
          className="h-full w-full bg-black object-contain"
          controls
          playsInline
          preload="auto"
        />
      ) : (
        <>
          <Image src={HERO_IMAGE_SRC} alt="" fill priority className="bg-black object-contain" />
          <button
            type="button"
            onClick={() => {
              void playLandingVideo();
            }}
            className="absolute left-1/2 top-[43%] h-[40%] w-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-black/90"
            aria-label="Play Casa video"
          />
        </>
      )}
    </div>
  );
}
