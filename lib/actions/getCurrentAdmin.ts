import { createClient } from "@/lib/supabase/server";

export async function getCurrentAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      display_name,
      rank,
      is_admin
      `
    )
    .eq("id", user.id)
    .single();

  if (error || !profile?.is_admin) {
    return null;
  }

  return profile;
}