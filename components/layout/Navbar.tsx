"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white dark:bg-black dark:border-zinc-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-black dark:text-white">
          Retreat
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
            Home
          </Link>
          <Link href="/venue" className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
            Venue
          </Link>
          <Link href="/booking" className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
            Booking
          </Link>
        </div>

        {/* Mobile Burger Button */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-black border-t dark:border-zinc-800 px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block text-zinc-700 dark:text-zinc-300"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/venue"
            className="block text-zinc-700 dark:text-zinc-300"
            onClick={() => setOpen(false)}
          >
            Venue
          </Link>
          <Link
            href="/about"
            className="block text-zinc-700 dark:text-zinc-300"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
