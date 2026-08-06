interface ChatMessageProps {
  status: "Victory" | "Defeat" | "Awaiting";
  rank: string;
  name: string;
  streak: number;
  message: string;
  time: string;
}

export default function ChatMessage({
  status,
  rank,
  name,
  streak,
  message,
  time,
}: ChatMessageProps) {
  const statusColor =
    status === "Victory"
      ? "text-green-400"
      : status === "Defeat"
        ? "text-red-400"
        : "text-yellow-400";

  return (
    <div className="rounded-xl border border-white/10 bg-[#0B1220] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm font-semibold ${statusColor}`}>
            {status}
          </p>

          <h3 className="mt-1 font-bold text-white">
            {rank} {name}
          </h3>

          <p className="mt-1 text-sm text-[#D4AF37]">
            🔥 {streak} Days
          </p>
        </div>

        <span className="text-xs text-gray-500">
          {time}
        </span>
      </div>

      <p className="mt-4 leading-7 text-gray-300">
        {message}
      </p>
    </div>
  );
}