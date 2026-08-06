import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ChatMessage from "@/components/barracks/ChatMessage";
import ChatInput from "@/components/barracks/ChatInput";
import OnlineSoldiers from "@/components/barracks/OnlineSoldiers";
import RealtimeMessages from "@/components/barracks/RealtimeMessages";

import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getMessages } from "@/lib/actions/getMessages";

export default async function BarracksPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const messages = await getMessages();

  return (
    <DashboardLayout>

      <RealtimeMessages />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Barracks Chat
        </h1>

        <p className="mt-2 text-gray-400">
          Encourage fellow soldiers and stand together in faith.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <section className="flex h-[75vh] flex-col rounded-xl border border-[#D4AF37]/20 bg-[#111827] p-6">
          <div
            id="messages-container"
            className="flex-1 space-y-4 overflow-y-auto pr-2"
          >
            {messages.map((chat) => {
              const profile = Array.isArray(chat.profiles)
                ? chat.profiles[0]
                : chat.profiles;

              return (
                <ChatMessage
                  key={chat.id}
                  status={chat.status}
                  rank={profile?.rank ?? "Recruit"}
                  name={profile?.display_name ?? "Soldier"}
                  streak={profile?.current_streak ?? 0}
                  message={chat.message}

                  time={new Date(chat.created_at).toLocaleTimeString(
                    "en-PH",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: "Asia/Manila",
                    }
                  )}
                  isOwnMessage={chat.user_id === currentUser.id}
                  avatarUrl={profile?.avatar_url ?? null}
                />
              );
            })}

            {messages.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-[#0B1220] p-6 text-center text-gray-400">
                No messages yet. Be the first to encourage the barracks.
              </p>
            )}
          </div>

          <ChatInput />
        </section>

        <OnlineSoldiers
          currentSoldier={{
            id: currentUser.id,
            name: currentUser.display_name,
            rank: currentUser.rank,
            streak: currentUser.current_streak,
            avatarUrl: currentUser.avatar_url,
          }}
        />
      </div>
    </DashboardLayout>
  );
}