"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const THEME_SONG_SRC = process.env.NEXT_PUBLIC_THEME_SONG_URL ?? "/theme-song.wav";
const HERO_IMAGE_SRC = "/casade-hero.svg";

export default function ThemeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasAudioError, setHasAudioError] = useState(false);

  useEffect(() => {
    setHasAudioError(false);
  }, []);

  const playThemeSong = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    await audio.play();
  };

  return (
    <div className="relative aspect-square w-full max-w-[960px]">
      <audio
        ref={audioRef}
        src={THEME_SONG_SRC}
        preload="auto"
        onError={() => {
          setHasAudioError(true);
        }}
      />
      <Image src={HERO_IMAGE_SRC} alt="" fill priority className="object-contain" />
      <button
        type="button"
        onClick={() => {
          void playThemeSong();
        }}
        className="absolute left-1/2 top-[34%] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent disabled:cursor-not-allowed"
        aria-label="Play theme song"
        disabled={hasAudioError}
      />
    </div>
  );
}
