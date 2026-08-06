import { createClient } from "@/lib/supabase/server";

interface CheckAchievementsOptions {
  userId: string;
  currentStreak: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: number;
}

export async function checkAchievements({
  userId,
  currentStreak,
}: CheckAchievementsOptions) {
  const supabase = await createClient();

  // Count all Victory reports.
  const { count: victoryCount, error: victoryError } =
    await supabase
      .from("battle_reports")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .eq("result", "Victory");

  if (victoryError) {
    throw victoryError;
  }

  // Load all available achievements.
  const { data: achievements, error: achievementsError } =
    await supabase
      .from("achievements")
      .select(
        `
        id,
        name,
        description,
        icon,
        category,
        requirement
        `
      );

  if (achievementsError) {
    throw achievementsError;
  }

  const eligibleAchievements = (
    (achievements ?? []) as Achievement[]
  ).filter((achievement) => {
    if (achievement.category === "victory") {
      return (
        (victoryCount ?? 0) >= achievement.requirement
      );
    }

    if (
      achievement.category === "streak" ||
      achievement.category === "rank"
    ) {
      return currentStreak >= achievement.requirement;
    }

    return false;
  });

  if (eligibleAchievements.length === 0) {
    return [];
  }

  const eligibleIds = eligibleAchievements.map(
    (achievement) => achievement.id
  );

  // Find achievements already unlocked by this user.
  const { data: existingRows, error: existingError } =
    await supabase
      .from("user_achievements")
      .select("achievement_id")
      .eq("user_id", userId)
      .in("achievement_id", eligibleIds);

  if (existingError) {
    throw existingError;
  }

  const existingIds = new Set(
    (existingRows ?? []).map(
      (row) => row.achievement_id
    )
  );

  const newlyUnlocked = eligibleAchievements.filter(
    (achievement) => !existingIds.has(achievement.id)
  );

  if (newlyUnlocked.length === 0) {
    return [];
  }

  const { error: unlockError } = await supabase
    .from("user_achievements")
    .insert(
      newlyUnlocked.map((achievement) => ({
        user_id: userId,
        achievement_id: achievement.id,
      }))
    );

  if (unlockError) {
    throw unlockError;
  }
  const { error: notificationError } = await supabase
    .from("notifications")
    .insert(
      newlyUnlocked.map((achievement) => ({
        user_id: userId,
        type: "achievement",
        title: "Achievement Unlocked",
        message: `${achievement.icon} ${achievement.name} — ${achievement.description}`,
        link: "/achievements",
      }))
    );

  if (notificationError) {
    console.error(
      "Achievement notification error:",
      notificationError
    );
  }

  return newlyUnlocked.map((achievement) => ({
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    icon: achievement.icon,
  }));
}