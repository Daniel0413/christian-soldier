import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import TopThree from "@/components/leaderboard/TopThree";
import SoldierRow from "@/components/leaderboard/SoldierRow";
import { createClient } from "@/lib/supabase/server";

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data: soldiers, error } = await supabase
    .from("profiles")
    .select(`
      id,
      display_name,
      rank,
      current_streak,
      best_streak,
      avatar_url
    `)
    .order("current_streak", { ascending: false });

  if (error) {
    console.error("Leaderboard error:", error);
  }

  const leaderboard = soldiers ?? [];
  const topThree = leaderboard.slice(0, 3);
  const remainingSoldiers = leaderboard.slice(3);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          🏆 Leaderboard
        </h1>

        <p className="mt-2 text-gray-400">
          See who is currently leading in consistency.
        </p>
      </div>

      <TopThree soldiers={topThree} />

      <div className="mt-10 space-y-4">
        {remainingSoldiers.map((soldier, index) => (
          <SoldierRow
            key={soldier.id}
            position={index + 4}
            name={soldier.display_name}
            rank={soldier.rank}
            streak={soldier.current_streak}
            status="Awaiting"
            avatarUrl={soldier.avatar_url}
          />
        ))}

        {leaderboard.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-[#0B1220] p-6 text-center text-gray-400">
            No soldiers found yet.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}