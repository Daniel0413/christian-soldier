"use client";

import Link from "next/link";
import AuthModals from "@/components/landing/AuthModals";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1220]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold text-[#D4AF37]"
        >
          ✝ Christian Soldier
        </Link>

        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="font-medium text-[#D4AF37] transition hover:text-yellow-300"
          >
            About
          </a>

          <AuthModals />
        </nav>
      </div>
    </header>
  );
}