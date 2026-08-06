import Image from "next/image";
import { UserRound } from "lucide-react";

interface Soldier {
  id: string;
  display_name: string;
  rank: string;
  current_streak: number;
  best_streak: number;
  avatar_url: string | null;
}

interface TopThreeProps {
  soldiers: Soldier[];
}

export default function TopThree({
  soldiers,
}: TopThreeProps) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {soldiers.map((soldier, index) => (
        <div
          key={soldier.id}
          className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-6 text-center"
        >
          <div className="text-6xl">
            {medals[index]}
          </div>

          {/* Avatar */}
          <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
            {soldier.avatar_url ? (
              <Image
                src={soldier.avatar_url}
                alt={soldier.display_name}
                width={80}
                height={80}
                className="h-20 w-20 object-cover"
              />
            ) : (
              <UserRound className="h-9 w-9 text-[#D4AF37]" />
            )}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            {soldier.display_name}
          </h2>

          <p className="mt-2 text-[#D4AF37]">
            {soldier.rank}
          </p>

          <p className="mt-4 text-lg text-white">
            🔥 {soldier.current_streak} Days
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Best: {soldier.best_streak} Days
          </p>
        </div>
      ))}
    </div>
  );
}