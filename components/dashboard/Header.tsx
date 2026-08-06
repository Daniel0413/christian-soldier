"use client";

import { UserRound } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

export default function Header() {
  const today = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
          Command Center
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          {greeting}, {currentUser.name}
        </h1>

        <p className="mt-2 text-gray-400">
          Stay faithful. Fight the good fight.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] px-5 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37]/10">
          <UserRound className="h-6 w-6 text-[#D4AF37]" />
        </div>

        <div>
          <p className="font-semibold text-white">
            {currentUser.name}
          </p>

          <p className="text-sm text-[#D4AF37]">
            {currentUser.rank}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {today}
          </p>
        </div>
      </div>
    </header>
  );
}