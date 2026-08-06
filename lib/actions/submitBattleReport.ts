"use server";

import { createClient } from "@/lib/supabase/server";

type BattleResult = "Victory" | "Defeat";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function submitBattleReport(result: BattleResult) {
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
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = formatDate(yesterdayDate);

  // Prevent duplicate reports.
  const { data: existingReport, error: existingError } =
    await supabase
      .from("battle_reports")
      .select("id")
      .eq("user_id", user.id)
      .eq("report_date", today)
      .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existingReport) {
    throw new Error("You already submitted today's report.");
  }

  // Load the profile.
  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("current_streak, best_streak")
      .eq("id", user.id)
      .single();

  if (profileError || !profile) {
    throw new Error("Profile not found.");
  }

  // Check whether yesterday was a Victory.
  const { data: yesterdayReport, error: yesterdayError } =
    await supabase
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
  } else if (yesterdayReport?.result === "Victory") {
    currentStreak += 1;
  } else {
    // First Victory or a Victory after missing/losing a day.
    currentStreak = 1;
  }

  bestStreak = Math.max(bestStreak, currentStreak);

  // Save the report.
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

  // Update streak values.
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      current_streak: currentStreak,
      best_streak: bestStreak,
    })
    .eq("id", user.id);

  if (updateError) {
    // Remove the report so the two tables do not disagree.
    await supabase
      .from("battle_reports")
      .delete()
      .eq("user_id", user.id)
      .eq("report_date", today);

    throw updateError;
  }

  return {
    result,
    currentStreak,
    bestStreak,
  };
}