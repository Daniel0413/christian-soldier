import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/actions/getCurrentAdmin";

function getPhilippinesDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function getAdminAnalytics() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Unauthorized.");
  }

  const supabase = await createClient();
  const today = getPhilippinesDate();

  const [
    soldiersResult,
    victoriesResult,
    defeatsResult,
    reportsResult,
    ordersResult,
    achievementsResult,
    verseResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("battle_reports")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("report_date", today)
      .eq("result", "Victory"),

    supabase
      .from("battle_reports")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("report_date", today)
      .eq("result", "Defeat"),

    supabase
      .from("battle_reports")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("report_date", today),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("user_achievements")
      .select("id", {
        count: "exact",
        head: true,
      })
      .gte("unlocked_at", `${today}T00:00:00+08:00`)
      .lt("unlocked_at", `${today}T23:59:59.999+08:00`),

    supabase
      .from("daily_verses")
      .select("id")
      .eq("verse_date", today)
      .maybeSingle(),
  ]);

  const errors = [
    soldiersResult.error,
    victoriesResult.error,
    defeatsResult.error,
    reportsResult.error,
    ordersResult.error,
    achievementsResult.error,
    verseResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    console.error("Admin analytics errors:", errors);
  }

  const totalSoldiers = soldiersResult.count ?? 0;
  const victoriesToday = victoriesResult.count ?? 0;
  const defeatsToday = defeatsResult.count ?? 0;
  const reportsToday = reportsResult.count ?? 0;

  const awaitingToday = Math.max(
    totalSoldiers - reportsToday,
    0
  );

  return {
    totalSoldiers,
    victoriesToday,
    defeatsToday,
    reportsToday,
    awaitingToday,
    totalOrders: ordersResult.count ?? 0,
    achievementsToday: achievementsResult.count ?? 0,
    versePublished: Boolean(verseResult.data),
  };
}