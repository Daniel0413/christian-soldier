"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/actions/getCurrentAdmin";

export async function saveDailyVerse(
  formData: FormData
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Unauthorized.");
  }

  const reference = String(
    formData.get("reference") ?? ""
  ).trim();

  const verse = String(
    formData.get("verse") ?? ""
  ).trim();

  const verseDate = String(
    formData.get("verse_date") ?? ""
  ).trim();

  if (!reference || !verse || !verseDate) {
    throw new Error("All verse fields are required.");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("daily_verses")
    .upsert(
      {
        reference,
        verse,
        verse_date: verseDate,
      },
      {
        onConflict: "verse_date",
      }
    );

  if (error) {
    throw error;
  }

  // Notify every soldier
  const { data: soldiers, error: soldiersError } =
    await supabase
      .from("profiles")
      .select("id");

  if (soldiersError) {
    console.error(
      "Unable to load soldiers:",
      soldiersError
    );
  } else if (soldiers.length > 0) {
    const notifications = soldiers.map((soldier) => ({
      user_id: soldier.id,
      type: "verse",
      title: "Daily Verse Published",
      message: `📖 ${reference}`,
      link: "/dashboard",
    }));

    const { error: notificationError } =
      await supabase
        .from("notifications")
        .insert(notifications);

    if (notificationError) {
      console.error(
        "Verse notification error:",
        notificationError
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/notifications");
}