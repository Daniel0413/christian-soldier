import Image from "next/image";
import { UserRound } from "lucide-react";

interface SoldierRowProps {
  position: number;
  name: string;
  rank: string;
  streak: number;
  status: "Victory" | "Defeat" | "Awaiting";
  avatarUrl: string | null;
}

export default function SoldierRow({
  position,
  name,
  rank,
  streak,
  status,
  avatarUrl,
}: SoldierRowProps) {
  const statusColor =
    status === "Victory"
      ? "text-green-400"
      : status === "Defeat"
        ? "text-red-400"
        : "text-yellow-400";

  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#0B1220] p-4">
      <div className="w-10 text-center text-lg font-bold text-[#D4AF37]">
        #{position}
      </div>

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

      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-white">
          {name}
        </p>

        <p className="text-sm text-[#D4AF37]">
          {rank}
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-white">
          🔥 {streak} Days
        </p>

        <p className={`mt-1 text-sm ${statusColor}`}>
          {status}
        </p>
      </div>
    </div>
  );
}