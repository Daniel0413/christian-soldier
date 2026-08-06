import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import TopThree from "@/components/leaderboard/TopThree";
import SoldierRow from "@/components/leaderboard/SoldierRow";
import { leaderboard } from "@/lib/mock-data";

export default function LeaderboardPage() {
  const remainingSoldiers = leaderboard.slice(3);

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-3xl font-bold text-white">
        🏆 Leaderboard
      </h1>

      <TopThree />

      <div className="mt-10 space-y-4">
        {remainingSoldiers.map((soldier, index) => (
          <SoldierRow
            key={soldier.id}
            position={index + 4}
            name={soldier.name}
            rank={soldier.rank}
            streak={soldier.streak}
            status={soldier.status}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}