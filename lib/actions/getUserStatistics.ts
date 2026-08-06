import { createClient } from "@/lib/supabase/server";

export async function getUserStatistics(userId: string) {
  const supabase = await createClient();

  const { count: victories, error: victoriesError } =
    await supabase
      .from("battle_reports")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .eq("result", "Victory");

  if (victoriesError) {
    throw victoriesError;
  }

  const { count: defeats, error: defeatsError } =
    await supabase
      .from("battle_reports")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .eq("result", "Defeat");

  if (defeatsError) {
    throw defeatsError;
  }

  const totalVictories = victories ?? 0;
  const totalDefeats = defeats ?? 0;
  const reportsSubmitted =
    totalVictories + totalDefeats;

  const victoryRate =
    reportsSubmitted === 0
      ? 0
      : Math.round(
          (totalVictories / reportsSubmitted) * 100
        );

  return {
    victories: totalVictories,
    defeats: totalDefeats,
    reportsSubmitted,
    victoryRate,
  };
}