"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/actions/getCurrentAdmin";
import { getRank } from "@/lib/actions/getRank";
import { checkAchievements } from "@/lib/actions/checkAchievements";

type BattleResult = "Victory" | "Defeat";

export async function adminSubmitBattleReport(
    formData: FormData
) {
    const admin = await getCurrentAdmin();

    if (!admin) {
        throw new Error("Unauthorized.");
    }

    const soldierId = String(
        formData.get("soldier_id") ?? ""
    ).trim();

    const reportDate = String(
        formData.get("report_date") ?? ""
    ).trim();

    const result = String(
        formData.get("result") ?? ""
    ).trim() as BattleResult;

    if (!soldierId) {
        throw new Error("Please select a soldier.");
    }

    if (!reportDate) {
        throw new Error("Please select a report date.");
    }

    if (
        result !== "Victory" &&
        result !== "Defeat"
    ) {
        throw new Error(
            "Please select Victory or Defeat."
        );
    }

    const supabase = await createClient();

    // Load soldier profile
    const {
        data: soldier,
        error: soldierError,
    } = await supabase
        .from("profiles")
        .select(`
      id,
      display_name,
      current_streak,
      best_streak,
      rank
    `)
        .eq("id", soldierId)
        .single();

    if (soldierError || !soldier) {
        throw new Error("Soldier not found.");
    }

    // Prevent duplicate report
    const {
        data: existingReport,
        error: existingError,
    } = await supabase
        .from("battle_reports")
        .select("id")
        .eq("user_id", soldierId)
        .eq("report_date", reportDate)
        .maybeSingle();

    if (existingError) {
        throw existingError;
    }

    if (existingReport) {
        throw new Error(
            `${soldier.display_name} already has a report for this date.`
        );
    }

    // Insert report
    const { error: insertError } = await supabase
        .from("battle_reports")
        .insert({
            user_id: soldierId,
            report_date: reportDate,
            result,
            submitted_by: admin.id,
            submitted_by_admin: true,
        });

    if (insertError) {
        throw insertError;
    }

    // Use existing real-world streak as the base
    let currentStreak = soldier.current_streak ?? 0;
    let bestStreak = soldier.best_streak ?? 0;

    if (result === "Victory") {
        currentStreak += 1;
    } else {
        currentStreak = 0;
    }

    bestStreak = Math.max(
        bestStreak,
        currentStreak
    );

    const newRank = getRank(currentStreak);

    // Update profile
    // Update soldier profile
    const {
        data: updatedProfile,
        error: profileUpdateError,
    } = await supabase
        .from("profiles")
        .update({
            current_streak: currentStreak,
            best_streak: bestStreak,
            rank: newRank,
        })
        .eq("id", soldierId)
        .select(`
    id,
    current_streak,
    best_streak,
    rank
  `)
        .single();

    if (profileUpdateError || !updatedProfile) {
        // Roll back the battle report if profile update fails
        await supabase
            .from("battle_reports")
            .delete()
            .eq("user_id", soldierId)
            .eq("report_date", reportDate);

        console.error(
            "Profile update error:",
            profileUpdateError
        );

        throw new Error(
            "Unable to update the soldier's streak."
        );
    }

    console.log(
        "Updated soldier profile:",
        updatedProfile
    );

    // Promotion notification
    if (newRank !== soldier.rank) {
        const { error: rankNotificationError } =
            await supabase
                .from("notifications")
                .insert({
                    user_id: soldierId,
                    type: "promotion",
                    title: "Rank Promotion",
                    message:
                        `⭐ Congratulations! You have been promoted ` +
                        `from ${soldier.rank} to ${newRank}.`,
                    link: "/rank-progress",
                });

        if (rankNotificationError) {
            console.error(
                "Rank notification error:",
                rankNotificationError
            );
        }
    }

    // Check achievements
    await checkAchievements({
        userId: soldierId,
        currentStreak,
    });

    // Notify soldier that admin recorded it
    const { error: notificationError } =
        await supabase
            .from("notifications")
            .insert({
                user_id: soldierId,
                type: "battle_report",
                title: "Battle Report Recorded",
                message:
                    `⚔ Headquarters recorded your ${result} ` +
                    `report for ${reportDate}.`,
                link: "/dashboard",
            });

    if (notificationError) {
        console.error(
            "Admin battle report notification error:",
            notificationError
        );
    }

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/profile");
    revalidatePath("/leaderboard");
    revalidatePath("/rank-progress");
    revalidatePath("/achievements");
    revalidatePath("/statistics");
    revalidatePath("/notifications");
    revalidatePath("/barracks");

    return {
        success: true,
        soldierName: soldier.display_name,
        result,
        reportDate,
        currentStreak,
        bestStreak,
        rank: newRank,
    };
}