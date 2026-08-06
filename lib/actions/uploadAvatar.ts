"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized.");
  }

  const file = formData.get("avatar") as File;

  if (!file || file.size === 0) {
    throw new Error("No file selected.");
  }

  const extension = file.name.split(".").pop();
  const fileName = `${user.id}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("id", user.id);

  if (updateError) {
    throw updateError;
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  revalidatePath("/leaderboard");
  revalidatePath("/barracks");

  return publicUrl;
}