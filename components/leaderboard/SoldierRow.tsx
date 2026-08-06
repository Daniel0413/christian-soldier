interface SoldierRowProps {
  position: number;
  name: string;
  rank: string;
  streak: number;
  status: string;
}

export default function SoldierRow({
  position,
  name,
  rank,
  streak,
  status,
}: SoldierRowProps) {
  const statusColor =
    status === "Victory"
      ? "text-green-400"
      : status === "Defeat"
        ? "text-red-400"
        : "text-yellow-400";

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0B1220] p-5">
      <div>
        <h3 className="text-lg font-bold text-white">
          #{position} {name}
        </h3>

        <p className="text-[#D4AF37]">
          {rank}
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-white">
          🔥 {streak} Days
        </p>

        <p className={`mt-1 text-sm font-semibold ${statusColor}`}>
          {status}
        </p>
      </div>
    </div>
  );
}