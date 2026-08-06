import { createClient } from "@/lib/supabase/server";

function getPhilippinesDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function getTodayVerse() {
  const supabase = await createClient();
  const today = getPhilippinesDate();

  const { data, error } = await supabase
    .from("daily_verses")
    .select("id, reference, verse, verse_date")
    .eq("verse_date", today)
    .maybeSingle();

  if (error) {
    console.error("Daily verse error:", error);
    return null;
  }

  return data;
}