import { createClient } from "@/lib/supabase/server";

export async function getUserAchievements(
  userId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select(`
      id,
      unlocked_at,
      achievements (
        id,
        name,
        description,
        icon,
        category,
        requirement
      )
    `)
    .eq("user_id", userId)
    .order("unlocked_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Achievements error:",
      error
    );
    return [];
  }

  return data ?? [];
}