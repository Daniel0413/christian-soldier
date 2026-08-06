import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Award,
  Bell,
  BookOpen,
  ScrollText,
  Star,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getNotifications } from "@/lib/actions/getNotifications";
import { markNotificationRead } from "@/lib/actions/markNotificationRead";

const notificationIcons = {
  order: ScrollText,
  verse: BookOpen,
  achievement: Award,
  promotion: Star,
  system: Bell,
};

export default async function NotificationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const notifications = await getNotifications(50);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            🔔 Notifications
          </h1>

          <p className="mt-2 text-gray-400">
            View your latest orders, achievements, verses,
            and promotions.
          </p>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon =
              notificationIcons[
                notification.type as keyof typeof notificationIcons
              ] ?? Bell;

            const content = (
              <div
                className={`rounded-xl border p-5 transition ${
                  notification.is_read
                    ? "border-white/10 bg-[#0B1220]"
                    : "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h2 className="font-bold text-white">
                        {notification.title}
                      </h2>

                      {!notification.is_read && (
                        <span className="rounded-full bg-[#D4AF37] px-2 py-0.5 text-xs font-bold text-black">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-gray-500">
                      {new Date(
                        notification.created_at
                      ).toLocaleString("en-PH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Manila",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );

            if (notification.is_read) {
              return notification.link ? (
                <Link
                  key={notification.id}
                  href={notification.link}
                >
                  {content}
                </Link>
              ) : (
                <div key={notification.id}>
                  {content}
                </div>
              );
            }

            return (
              <form
                key={notification.id}
                action={async () => {
                  "use server";

                  await markNotificationRead(
                    notification.id
                  );

                  if (notification.link) {
                    redirect(notification.link);
                  }
                }}
              >
                <button
                  type="submit"
                  className="w-full text-left"
                >
                  {content}
                </button>
              </form>
            );
          })}

          {notifications.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-[#0B1220] p-10 text-center">
              <Bell className="mx-auto h-10 w-10 text-gray-500" />

              <p className="mt-4 font-semibold text-white">
                No notifications yet
              </p>

              <p className="mt-2 text-sm text-gray-400">
                New orders, achievements, and promotions will
                appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}