"use server";

import { revalidatePath, refresh } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { getRank } from "@/lib/actions/getRank";
import { checkAchievements } from "@/lib/actions/checkAchievements";

type BattleResult = "Victory" | "Defeat";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function submitBattleReport(
  result: BattleResult
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated.");
  }

  const todayDate = new Date();
  const today = formatDate(todayDate);

  const yesterdayDate = new Date(todayDate);

  yesterdayDate.setUTCDate(
    yesterdayDate.getUTCDate() - 1
  );

  const yesterday = formatDate(yesterdayDate);

  // Prevent duplicate reports.
  const {
    data: existingReport,
    error: existingError,
  } = await supabase
    .from("battle_reports")
    .select("id")
    .eq("user_id", user.id)
    .eq("report_date", today)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existingReport) {
    throw new Error(
      "You already submitted today's report."
    );
  }

  // Load the current profile.
  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(
      `
      current_streak,
      best_streak,
      rank
      `
    )
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Profile not found.");
  }

  // Check yesterday's battle report.
  const {
    data: yesterdayReport,
    error: yesterdayError,
  } = await supabase
    .from("battle_reports")
    .select("result")
    .eq("user_id", user.id)
    .eq("report_date", yesterday)
    .maybeSingle();

  if (yesterdayError) {
    throw yesterdayError;
  }

  let currentStreak = profile.current_streak;
  let bestStreak = profile.best_streak;

  if (result === "Defeat") {
    currentStreak = 0;
  } else if (
    yesterdayReport?.result === "Victory"
  ) {
    currentStreak += 1;
  } else {
    // First Victory or Victory after a missed or lost day.
    currentStreak = 1;
  }

  bestStreak = Math.max(
    bestStreak,
    currentStreak
  );

  // Calculate the new rank.
  const rank = getRank(currentStreak);

  // Save today's report.
  const { error: reportError } = await supabase
    .from("battle_reports")
    .insert({
      user_id: user.id,
      report_date: today,
      result,
    });

  if (reportError) {
    throw reportError;
  }

  // Update the profile streak and rank.
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      current_streak: currentStreak,
      best_streak: bestStreak,
      rank,
    })
    .eq("id", user.id);

  if (updateError) {
    // Remove today's report if the profile update fails.
    await supabase
      .from("battle_reports")
      .delete()
      .eq("user_id", user.id)
      .eq("report_date", today);

    throw updateError;
  }

  // Create a notification only when the rank changes.
  if (rank !== profile.rank) {
    const {
      error: promotionNotificationError,
    } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "promotion",
        title: "Rank Promotion",
        message: `⭐ Congratulations! You have been promoted from ${profile.rank} to ${rank}.`,
        link: "/rank-progress",
      });

    if (promotionNotificationError) {
      console.error(
        "Promotion notification error:",
        promotionNotificationError
      );
    }
  }

  // Check and unlock newly earned achievements.
  const unlockedAchievements =
    await checkAchievements({
      userId: user.id,
      currentStreak,
    });

  revalidatePath("/dashboard");
  revalidatePath("/profile");
  revalidatePath("/leaderboard");
  revalidatePath("/rank-progress");
  revalidatePath("/achievements");
  revalidatePath("/statistics");
  revalidatePath("/notifications");
  revalidatePath("/barracks");

  refresh();

  return {
    result,
    currentStreak,
    bestStreak,
    rank,
    unlockedAchievements,
  };
}