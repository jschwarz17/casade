"use client";

import { useEffect, useRef, useState } from "react";

const THEME_SONG_SRC = process.env.NEXT_PUBLIC_THEME_SONG_URL ?? "/theme-song.wav";

export default function ThemeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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
        setStatusMessage("Theme song is playing.");
      } catch {
        setIsPlaying(false);
        setStatusMessage("Autoplay was blocked. Press play to start the theme song.");
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
        setStatusMessage("Theme song is playing.");
      } catch {
        setIsPlaying(false);
        setStatusMessage("Unable to play theme song. Check your browser media settings.");
      }

      return;
    }

    audio.pause();
    setIsPlaying(false);
    setStatusMessage("Theme song paused.");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <audio
        ref={audioRef}
        src={THEME_SONG_SRC}
        preload="auto"
        onError={() => {
          setHasAudioError(true);
          setIsPlaying(false);
          setStatusMessage(
            `Theme song could not load from ${THEME_SONG_SRC}. Add public/theme-song.wav or set NEXT_PUBLIC_THEME_SONG_URL.`
          );
        }}
      />
      <button
        type="button"
        onClick={() => void togglePlayback()}
        className="rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isPlaying ? "Pause theme song" : "Play theme song"}
        disabled={hasAudioError}
      >
        {isPlaying ? "Pause theme song" : "Play theme song"}
      </button>
      {statusMessage ? (
        <p className="text-xs text-gray-600 dark:text-gray-400">{statusMessage}</p>
      ) : null}
    </div>
  );
}
