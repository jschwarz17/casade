"use client";

import { useEffect, useRef, useState } from "react";

const THEME_SONG_SRC = "/theme-song.mp3";

export default function ThemeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        setShowControls(true);
      }
    };

    void tryAutoplay();
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <audio ref={audioRef} src={THEME_SONG_SRC} preload="auto" />
      {showControls ? (
        <button
          type="button"
          onClick={() => void togglePlayback()}
          className="rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          aria-label={isPlaying ? "Pause theme song" : "Play theme song"}
        >
          {isPlaying ? "Pause theme song" : "Play theme song"}
        </button>
      ) : null}
    </>
  );
}
