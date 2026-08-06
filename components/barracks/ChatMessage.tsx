import Image from "next/image";
import { UserRound } from "lucide-react";

interface ChatMessageProps {
  status: "Victory" | "Defeat" | "Awaiting";
  rank: string;
  name: string;
  streak: number;
  message: string;
  time: string;
  isOwnMessage: boolean;
  avatarUrl: string | null;
}

export default function ChatMessage({
  status,
  rank,
  name,
  streak,
  message,
  time,
  isOwnMessage,
  avatarUrl,
}: ChatMessageProps) {
  const statusColor =
    status === "Victory"
      ? "text-green-400"
      : status === "Defeat"
        ? "text-red-400"
        : "text-yellow-400";

  return (
    <div
      className={`flex items-end gap-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && (
        <MessageAvatar
          avatarUrl={avatarUrl}
          name={name}
        />
      )}

      <div
        className={`max-w-[85%] rounded-2xl border p-4 sm:max-w-[70%] ${
          isOwnMessage
            ? "border-green-500/20 bg-green-900/30"
            : "border-white/10 bg-[#0B1220]"
        }`}
      >
        <div
          className={`flex items-start gap-4 ${
            isOwnMessage
              ? "flex-row-reverse text-right"
              : "justify-between"
          }`}
        >
          <div>
            <p
              className={`text-sm font-semibold ${statusColor}`}
            >
              {status}
            </p>

            <h3 className="mt-1 font-bold text-white">
              {rank} {name}
            </h3>

            <p className="mt-1 text-sm text-[#D4AF37]">
              🔥 {streak} Days
            </p>
          </div>

          <span className="whitespace-nowrap text-xs text-gray-500">
            {time}
          </span>
        </div>

        <p
          className={`mt-4 break-words leading-7 text-gray-200 ${
            isOwnMessage ? "text-right" : "text-left"
          }`}
        >
          {message}
        </p>
      </div>

      {isOwnMessage && (
        <MessageAvatar
          avatarUrl={avatarUrl}
          name={name}
        />
      )}
    </div>
  );
}

function MessageAvatar({
  avatarUrl,
  name,
}: {
  avatarUrl: string | null;
  name: string;
}) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/10">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 object-cover"
        />
      ) : (
        <UserRound className="h-5 w-5 text-[#D4AF37]" />
      )}
    </div>
  );
}