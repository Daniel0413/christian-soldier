"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const displayName = String(
    formData.get("display_name") ?? ""
  ).trim();

  const bio = String(
    formData.get("bio") ?? ""
  ).trim();

  if (!displayName) {
    throw new Error("Display name is required.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      bio,
    })
    .eq("id", user.id);

  if (error) throw error;

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  revalidatePath("/leaderboard");
  revalidatePath("/barracks");
}