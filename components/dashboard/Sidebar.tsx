"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


import {
  House,
  User,
  Trophy,
  Medal,
  Award,
  BarChart3,
  MessageSquare,
  ScrollText,
  LogOut,
  UserRound,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: Award,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Rank Progress",
    href: "/rank-progress",
    icon: Medal,
  },
  {
    title: "Barracks",
    href: "/barracks",
    icon: MessageSquare,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ScrollText,
  },
  {
    title: "Statistics",
    href: "/statistics",
    icon: BarChart3,
  },
];
interface SidebarProps {
  name: string;
  rank: string;
  avatarUrl: string | null;
}

export default function Sidebar({
  name,
  rank,
  avatarUrl,
}: SidebarProps) {
  const pathname = usePathname();

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    window.location.href = "/";
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-[#0B1220]">
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <h1 className="text-2xl font-bold text-[#D4AF37]">
          ✝ Christian Soldier
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Fight the good fight.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                : "text-gray-300 hover:bg-white/5 hover:text-[#D4AF37]"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Information */}
      <div className="border-t border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/10">
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

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-white">
              {name}
            </h3>

            <p className="text-sm text-[#D4AF37]">
              {rank}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs text-gray-400">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}