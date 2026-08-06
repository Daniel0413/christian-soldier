import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import TopThree from "@/components/leaderboard/TopThree";
import SoldierRow from "@/components/leaderboard/SoldierRow";
import { createClient } from "@/lib/supabase/server";

type BattleStatus =
  | "Victory"
  | "Defeat"
  | "Awaiting";

function getPhilippinesDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const today = getPhilippinesDate();

  const [
    soldiersResult,
    reportsResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(`
        id,
        display_name,
        rank,
        current_streak,
        best_streak,
        avatar_url
      `)
      .order("current_streak", {
        ascending: false,
      })
      .order("best_streak", {
        ascending: false,
      })
      .order("display_name", {
        ascending: true,
      }),

    supabase
      .from("battle_reports")
      .select(`
        user_id,
        result
      `)
      .eq("report_date", today),
  ]);

  if (soldiersResult.error) {
    console.error(
      "Leaderboard error:",
      soldiersResult.error
    );
  }

  if (reportsResult.error) {
    console.error(
      "Today's reports error:",
      reportsResult.error
    );
  }

  const statusByUser = new Map<
    string,
    BattleStatus
  >();

  for (const report of reportsResult.data ?? []) {
    statusByUser.set(
      report.user_id,
      report.result as BattleStatus
    );
  }

  const leaderboard = (
    soldiersResult.data ?? []
  ).map((soldier) => ({
    ...soldier,
    status:
      statusByUser.get(soldier.id) ??
      ("Awaiting" as const),
  }));

  const topThree = leaderboard.slice(0, 3);
  const remainingSoldiers =
    leaderboard.slice(3);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          🏆 Leaderboard
        </h1>

        <p className="mt-2 text-gray-400">
          See who is currently leading in
          consistency.
        </p>
      </div>

      <TopThree soldiers={topThree} />

      <div className="mt-10 space-y-4">
        {remainingSoldiers.map(
          (soldier, index) => (
            <SoldierRow
              key={soldier.id}
              position={index + 4}
              name={soldier.display_name}
              rank={soldier.rank}
              streak={soldier.current_streak}
              status={soldier.status}
              avatarUrl={soldier.avatar_url}
            />
          )
        )}

        {leaderboard.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-[#0B1220] p-10 text-center">
            <p className="text-5xl">🏆</p>

            <p className="mt-4 font-bold text-white">
              No soldiers found
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Soldiers will appear here once
              profiles are available.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}