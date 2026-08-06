"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";

interface HeaderProps {
  name: string;
  rank: string;
  avatarUrl: string | null;
  unreadCount: number;
}

export default function Header({
  name,
  rank,
  avatarUrl,
  unreadCount,
}: HeaderProps) {
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
          {greeting}, {name}
        </h1>

        <p className="mt-2 text-gray-400">
          Stay faithful. Fight the good fight.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell unreadCount={unreadCount} />

        <div className="flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] px-5 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/10">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                width={48}
                height={48}
                className="h-12 w-12 object-cover"
              />
            ) : (
              <UserRound className="h-6 w-6 text-[#D4AF37]" />
            )}
          </div>

          <div>
            <p className="font-semibold text-white">
              {name}
            </p>

            <p className="text-sm text-[#D4AF37]">
              {rank}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {today}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}