import ThemeSongPlayer from "@/components/theme-song-player";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <ThemeSongPlayer />
        <h1 className="text-5xl font-bold tracking-tight">Casade</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Welcome to Casade. Your website is ready for development.
        </p>
        <div className="flex gap-4 mt-4">
          <a
            className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            href="https://github.com/jschwarz17/casade"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
