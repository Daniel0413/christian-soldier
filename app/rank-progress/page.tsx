import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getRankProgress } from "@/lib/actions/getRank";
import { ranks } from "@/lib/ranks";

export default async function RankProgressPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const streak = currentUser.current_streak;

  const {
    currentRank,
    nextRank,
    progress,
    daysRemaining,
  } = getRankProgress(streak);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            🎖 Rank Progress
          </h1>

          <p className="mt-2 text-gray-400">
            Continue your daily victories and rise through
            the Christian Soldier ranks.
          </p>
        </div>

        <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-8">
          <div className="text-center">
            <p className="text-5xl">
              {currentRank.icon}
            </p>

            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-400">
              Current Rank
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#D4AF37]">
              {currentRank.name} ({currentRank.abbreviation})
            </h2>

            <p className="mt-3 text-lg text-white">
              🔥 {streak} Day Streak
            </p>
          </div>

          {nextRank ? (
            <div className="mt-10 rounded-xl border border-white/10 bg-[#111827] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Next Rank
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-white">
                    {nextRank.icon} {nextRank.name} (
                    {nextRank.abbreviation})
                  </h3>
                </div>

                <p className="font-semibold text-[#D4AF37]">
                  {daysRemaining}{" "}
                  {daysRemaining === 1 ? "day" : "days"} remaining
                </p>
              </div>

              <Progress
                value={progress}
                className="mt-6"
              />

              <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>{streak} days</span>
                <span>{nextRank.days} days</span>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6 text-center">
              <p className="text-xl font-bold text-[#D4AF37]">
                Highest rank achieved
              </p>

              <p className="mt-2 text-gray-300">
                You have reached General of the Army.
              </p>
            </div>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-8">
          <h2 className="text-2xl font-bold text-[#D4AF37]">
            Christian Soldier Ranking
          </h2>

          <div className="mt-6 space-y-3">
            {[...ranks]
              .reverse()
              .map((rank) => {
                const reached = streak >= rank.days;
                const active =
                  currentRank.days === rank.days;

                return (
                  <div
                    key={`${rank.name}-${rank.abbreviation}`}
                    className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                      active
                        ? "border-[#D4AF37] bg-[#D4AF37]/10"
                        : reached
                          ? "border-green-500/20 bg-green-500/5"
                          : "border-white/10 bg-[#111827]"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-white">
                        {rank.icon} {rank.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {rank.abbreviation}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-[#D4AF37]">
                        Day {rank.days}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {active
                          ? "Current Rank"
                          : reached
                            ? "Completed"
                            : "Locked"}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          <blockquote className="mt-8 border-l-4 border-[#D4AF37] pl-5 text-gray-300">
            “Endure hardship as a good soldier of Christ
            Jesus.”
            <span className="mt-2 block text-[#D4AF37]">
              — 2 Timothy 2:3
            </span>
          </blockquote>
        </section>
      </div>
    </DashboardLayout>
  );
}