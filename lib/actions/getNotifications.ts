import { createClient } from "@/lib/supabase/server";

export async function getNotifications(limit = 20) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("notifications")
    .select(`
      id,
      type,
      title,
      message,
      link,
      is_read,
      created_at
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error("Notifications error:", error);
    return [];
  }

  return data ?? [];
}