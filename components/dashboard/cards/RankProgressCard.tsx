import { Progress } from "@/components/ui/progress";
import { getRankProgress } from "@/lib/actions/getRank";

interface RankProgressCardProps {
  streak: number;
}

export default function RankProgressCard({
  streak,
}: RankProgressCardProps) {
  const {
    currentRank,
    nextRank,
    progress,
    daysRemaining,
  } = getRankProgress(streak);

  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        🎖 Rank Progress
      </h2>

      <div className="mt-6">
        <p className="text-lg font-bold text-white">
          {currentRank.icon} {currentRank.name}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {currentRank.abbreviation}
        </p>
      </div>

      {nextRank ? (
        <>
          <Progress
            value={progress}
            className="mt-5"
          />

          <div className="mt-4 flex justify-between gap-4 text-sm text-gray-400">
            <span>{streak} days</span>

            <span>
              Next: {nextRank.name}
            </span>
          </div>

          <p className="mt-3 text-sm text-[#D4AF37]">
            {daysRemaining}{" "}
            {daysRemaining === 1 ? "day" : "days"} remaining
          </p>
        </>
      ) : (
        <p className="mt-5 text-[#D4AF37]">
          Highest rank achieved.
        </p>
      )}
    </div>
  );
}