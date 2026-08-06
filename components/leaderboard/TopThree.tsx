import { leaderboard } from "@/lib/mock-data";

export default function TopThree() {
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {topThree.map((soldier, index) => {
        const medals = ["🥇", "🥈", "🥉"];

        return (
          <div
            key={soldier.id}
            className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-6 text-center"
          >
            <div className="text-6xl">
              {medals[index]}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              {soldier.name}
            </h2>

            <p className="mt-2 text-[#D4AF37]">
              {soldier.rank}
            </p>

            <p className="mt-4 text-lg text-white">
              🔥 {soldier.streak} Days
            </p>

            <p
              className={`mt-3 text-sm font-semibold ${
                soldier.status === "Victory"
                  ? "text-green-400"
                  : soldier.status === "Defeat"
                    ? "text-red-400"
                    : "text-yellow-400"
              }`}
            >
              {soldier.status}
            </p>
          </div>
        );
      })}
    </div>
  );
}