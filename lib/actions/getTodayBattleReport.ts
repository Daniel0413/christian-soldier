import { createClient } from "@/lib/supabase/server";

export async function getTodayBattleReport() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("battle_reports")
    .select("*")
    .eq("user_id", user.id)
    .eq("report_date", today)
    .maybeSingle();

  return data;
}