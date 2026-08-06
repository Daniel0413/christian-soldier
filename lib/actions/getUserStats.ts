import { createClient } from "@/lib/supabase/server";

export async function getUserStats(userId: string) {
  const supabase = await createClient();

  const { count: victories } = await supabase
    .from("battle_reports")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .eq("result", "Victory");

  const { count: defeats } = await supabase
    .from("battle_reports")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .eq("result", "Defeat");

  return {
    victories: victories ?? 0,
    defeats: defeats ?? 0,
  };
}