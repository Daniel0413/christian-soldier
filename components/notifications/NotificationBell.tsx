"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

interface NotificationBellProps {
  unreadCount: number;
}

export default function NotificationBell({
  unreadCount,
}: NotificationBellProps) {
  const [count, setCount] = useState(unreadCount);

  useEffect(() => {
    const supabase = createClient();

    let channel: RealtimeChannel | null = null;
    let cancelled = false;

    async function fetchUnreadCount(userId: string) {
      const {
        count: unreadTotal,
        error,
      } = await supabase
        .from("notifications")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("user_id", userId)
        .eq("is_read", false);

      if (error) {
        console.error(
          "Unable to load unread notifications:",
          error
        );
        return;
      }

      if (!cancelled) {
        setCount(unreadTotal ?? 0);
      }
    }

    async function setupRealtime() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "Unable to get notification user:",
          userError
        );
        return;
      }

      if (!user || cancelled) {
        return;
      }

      await fetchUnreadCount(user.id);

      if (cancelled) {
        return;
      }

      channel = supabase
        .channel(
          `notification-bell-${user.id}-${crypto.randomUUID()}`
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log(
              "Notification INSERT received:",
              payload
            );

            void fetchUnreadCount(user.id);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log(
              "Notification UPDATE received:",
              payload
            );

            void fetchUnreadCount(user.id);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "notifications",
          },
          (payload) => {
            console.log(
              "Notification DELETE received:",
              payload
            );

            void fetchUnreadCount(user.id);
          }
        )
        .subscribe((status, error) => {
          console.log(
            "Notification realtime status:",
            status
          );

          if (error) {
            console.error(
              "Notification realtime error:",
              error
            );
          }
        });
    }

    void setupRealtime();

    return () => {
      cancelled = true;

      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, []);

  return (
    <Link
      href="/notifications"
      aria-label={`${count} unread notifications`}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#0B1220] transition hover:bg-white/5"
    >
      <Bell className="h-5 w-5 text-[#D4AF37]" />

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}