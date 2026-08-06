import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ChatMessage from "@/components/barracks/ChatMessage";
import ChatInput from "@/components/barracks/ChatInput";
import OnlineSoldiers from "@/components/barracks/OnlineSoldiers";
import { chatMessages } from "@/lib/mock-data";

export default function BarracksPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Barracks Chat
        </h1>

        <p className="mt-2 text-gray-400">
          Encourage fellow soldiers and stand together in faith.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <section className="rounded-xl border border-[#D4AF37]/20 bg-[#111827] p-6">
          <div className="space-y-4">
            {chatMessages.map((chat) => (
              <ChatMessage
                key={chat.id}
                status={chat.status}
                rank={chat.rank}
                name={chat.user}
                streak={chat.streak}
                message={chat.message}
                time={chat.time}
              />
            ))}
          </div>

          <ChatInput />
        </section>

        <OnlineSoldiers />
      </div>
    </DashboardLayout>
  );
}