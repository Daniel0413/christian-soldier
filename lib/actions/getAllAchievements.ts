import { createClient } from "@/lib/supabase/server";

export async function getAllAchievements() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("requirement", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}