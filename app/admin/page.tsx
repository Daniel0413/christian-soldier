import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import AdminForms from "@/components/admin/AdminForms";
import AdminBattleReport from "@/components/admin/AdminBattleReport";

import { getCurrentAdmin } from "@/lib/actions/getCurrentAdmin";
import { getAdminAnalytics } from "@/lib/actions/getAdminAnalytics";
import { createClient } from "@/lib/supabase/server";

import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  ScrollText,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

function getPhilippinesDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function AdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/dashboard");
  }

  const supabase = await createClient();

  // Get admin analytics
  const analytics = await getAdminAnalytics();

  // Get today's Philippine date
  const today = getPhilippinesDate();

  // Get all soldiers for Admin Battle Report
  const {
    data: soldiers,
    error: soldiersError,
  } = await supabase
    .from("profiles")
    .select(`
      id,
      display_name,
      rank
    `)
    .order("display_name", {
      ascending: true,
    });

  if (soldiersError) {
    console.error(
      "Admin soldiers error:",
      soldiersError
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
            Headquarters
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Admin Command Center
          </h1>

          <p className="mt-2 text-gray-400">
            Welcome, {admin.display_name}.
          </p>
        </div>

        {/* Analytics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard
            title="Total Soldiers"
            value={analytics.totalSoldiers.toString()}
            icon={Users}
          />

          <AdminStatCard
            title="Victories Today"
            value={analytics.victoriesToday.toString()}
            icon={ShieldCheck}
          />

          <AdminStatCard
            title="Defeats Today"
            value={analytics.defeatsToday.toString()}
            icon={XCircle}
          />

          <AdminStatCard
            title="Awaiting Reports"
            value={analytics.awaitingToday.toString()}
            icon={Clock3}
          />

          <AdminStatCard
            title="Reports Today"
            value={analytics.reportsToday.toString()}
            icon={CheckCircle2}
          />

          <AdminStatCard
            title="Total Orders"
            value={analytics.totalOrders.toString()}
            icon={ScrollText}
          />

          <AdminStatCard
            title="Achievements Today"
            value={analytics.achievementsToday.toString()}
            icon={Award}
          />

          <AdminStatCard
            title="Today's Verse"
            value={
              analytics.versePublished
                ? "Published"
                : "Not Published"
            }
            icon={BookOpen}
          />
        </div>

        {/* Admin Battle Report */}
        <div className="mb-8">
          <AdminBattleReport
            soldiers={soldiers ?? []}
            today={today}
          />
        </div>

        {/* Order + Daily Verse Forms */}
        <AdminForms today={today} />

      </div>
    </DashboardLayout>
  );
}

interface AdminStatCardProps {
  title: string;
  value: string;
  icon: typeof Users;
}

function AdminStatCard({
  title,
  value,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10">
        <Icon className="h-5 w-5 text-[#D4AF37]" />
      </div>

      <p className="mt-4 text-sm text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}