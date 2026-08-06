import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getUserStatistics } from "@/lib/actions/getUserStatistics";

import {
  BarChart3,
  CalendarDays,
  Flame,
  Medal,
  ShieldCheck,
  Trophy,
  XCircle,
  ClipboardCheck,
} from "lucide-react";

export default async function StatisticsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const statistics = await getUserStatistics(
    currentUser.id
  );

  const joinedDate = new Date(
    currentUser.created_at
  ).toLocaleDateString("en-PH", {
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            📊 Soldier Statistics
          </h1>

          <p className="mt-2 text-gray-400">
            Review your battle history and progress.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatisticCard
            title="Victories"
            value={statistics.victories.toString()}
            icon={ShieldCheck}
          />

          <StatisticCard
            title="Defeats"
            value={statistics.defeats.toString()}
            icon={XCircle}
          />

          <StatisticCard
            title="Victory Rate"
            value={`${statistics.victoryRate}%`}
            icon={BarChart3}
          />

          <StatisticCard
            title="Reports Submitted"
            value={statistics.reportsSubmitted.toString()}
            icon={ClipboardCheck}
          />

          <StatisticCard
            title="Current Streak"
            value={`${currentUser.current_streak} Days`}
            icon={Flame}
          />

          <StatisticCard
            title="Best Streak"
            value={`${currentUser.best_streak} Days`}
            icon={Trophy}
          />

          <StatisticCard
            title="Current Rank"
            value={currentUser.rank}
            icon={Medal}
          />

          <StatisticCard
            title="Joined"
            value={joinedDate}
            icon={CalendarDays}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

interface StatisticCardProps {
  title: string;
  value: string;
  icon: typeof Flame;
}

function StatisticCard({
  title,
  value,
  icon: Icon,
}: StatisticCardProps) {
  return (
    <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10">
        <Icon className="h-5 w-5 text-[#D4AF37]" />
      </div>

      <p className="mt-5 text-sm text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}