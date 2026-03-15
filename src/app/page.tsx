import ThemeSongPlayer from "@/components/theme-song-player";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] p-4">
      <main className="w-full max-w-[960px]">
        <ThemeSongPlayer />
      </main>
    </div>
  );
}
