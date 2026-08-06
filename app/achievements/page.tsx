import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { Progress } from "@/components/ui/progress";

import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getAllAchievements } from "@/lib/actions/getAllAchievements";
import { getUserAchievements } from "@/lib/actions/getUserAchievements";
import { getUserStats } from "@/lib/actions/getUserStats";

import { redirect } from "next/navigation";

export default async function AchievementsPage() {
    const currentUser = await getCurrentUser();
    const stats = await getUserStats(currentUser.id);

    if (!currentUser) {
        redirect("/");
    }

    const achievements = await getAllAchievements();
    const unlocked = await getUserAchievements(currentUser.id);

    const unlockedIds = new Set(
        unlocked.map((item: any) => {
            const achievement = Array.isArray(item.achievements)
                ? item.achievements[0]
                : item.achievements;

            return achievement?.id;
        })
    );

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-white">
                    🏅 Achievements
                </h1>

                <p className="mt-2 text-gray-400">
                    {unlocked.length} / {achievements.length} unlocked
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {achievements.map((achievement: any) => {
                        const unlockedAchievement = unlockedIds.has(
                            achievement.id
                        );

                        const currentValue =
                            achievement.category === "victory"
                                ? stats.victories
                                : currentUser.current_streak;

                        const progress =
                            achievement.requirement <= 0
                                ? 100
                                : Math.min(
                                    100,
                                    Math.round(
                                        (currentValue /
                                            achievement.requirement) *
                                        100
                                    )
                                );

                        return (
                            <div
                                key={achievement.id}
                                className={`rounded-xl border p-5 transition ${unlockedAchievement
                                        ? "border-[#D4AF37]/30 bg-[#0B1220]"
                                        : "border-white/10 bg-[#111827] opacity-60"
                                    }`}
                            >
                                <div className="text-5xl">
                                    {achievement.icon}
                                </div>

                                <h2 className="mt-4 text-xl font-bold text-white">
                                    {achievement.name}
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    {achievement.description}
                                </p>

                                <div className="mt-5">
                                    {unlockedAchievement ? (
                                        <span className="rounded-full bg-green-700 px-3 py-1 text-sm text-white">
                                            ✅ Unlocked
                                        </span>
                                    ) : (
                                        <div>
                                            <div className="mb-2 flex justify-between text-sm text-gray-400">
                                                <span>
                                                    {currentValue} /{" "}
                                                    {achievement.requirement}
                                                </span>

                                                <span>{progress}%</span>
                                            </div>

                                            <Progress value={progress} />

                                            <span className="mt-3 inline-block rounded-full bg-gray-700 px-3 py-1 text-sm text-white">
                                                🔒 Locked
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}