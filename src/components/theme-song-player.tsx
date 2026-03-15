"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HERO_IMAGE_SRC = "/casade-hero.jpg";
const LANDING_VIDEO_SRC = "/casa-logo-video.mp4";
const OPENING_FRAME_TIME_SECONDS = 0.15;

export default function ThemeSongPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    if (!isVideoVisible) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {
      // Keep the page stable if autoplay is denied after click.
    });
  }, [isVideoVisible]);

  const playLandingVideo = () => {
    setIsVideoVisible(true);
  };

  const resetToFirstFrame = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleSeeked = () => {
      video.pause();
    };

    video.addEventListener("seeked", handleSeeked, { once: true });
    video.currentTime = OPENING_FRAME_TIME_SECONDS;
  };

  return (
    <div className="relative aspect-square w-full max-w-[960px] bg-[#0d0d0d]">
      {isVideoVisible ? (
        <video
          ref={videoRef}
          src={LANDING_VIDEO_SRC}
          className="h-full w-full bg-[#0d0d0d] object-contain"
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onEnded={resetToFirstFrame}
        />
      ) : (
        <>
          <Image src={HERO_IMAGE_SRC} alt="" fill priority className="bg-[#0d0d0d] object-contain" />
          <button
            type="button"
            onClick={playLandingVideo}
            className="absolute left-1/2 top-[43%] h-[40%] w-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent"
            aria-label="Play Casa video"
          />
        </>
      )}
    </div>
  );
}
