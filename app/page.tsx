import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to Retreat Venue Booking System
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Discover and book the perfect retreat venue for your next event. Browse our curated selection of venues and easy booking.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/venue"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 md:w-[200px]"
          >
            Browse Venues
          </Link>
        </div>
      </main>
    </div>
  );
}