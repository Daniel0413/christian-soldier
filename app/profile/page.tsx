import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getUserAchievements } from "@/lib/actions/getUserAchievements";
import { redirect } from "next/navigation";
import AvatarUpload from "@/components/profile/AvatarUpload";
import EditProfileDialog from "@/components/profile/EditProfileDialog";


import {
  CalendarDays,
  Flame,
  Medal,
  Trophy,
  UserRound,
} from "lucide-react";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const unlockedAchievements = await getUserAchievements(
    currentUser.id
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Soldier Profile
            </h1>

            <p className="mt-2 text-gray-400">
              View your identity, rank, and battle progress.
            </p>
          </div>

          <EditProfileDialog
            displayName={currentUser.display_name}
            bio={currentUser.bio}
          />
        </div>

        <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-8">
          <div className="flex flex-col items-center text-center">
            <AvatarUpload
              avatarUrl={currentUser.avatar_url}
            />

            <h2 className="mt-5 text-3xl font-bold text-white">
              {currentUser.display_name}
            </h2>

            <p className="mt-2 text-lg font-semibold text-[#D4AF37]">
              {currentUser.rank}
            </p>

            <p className="mt-3 max-w-xl text-gray-400">
              {currentUser.bio || "No bio yet."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ProfileStat
              icon={Flame}
              label="Current Streak"
              value={`${currentUser.current_streak} Days`}
            />

            <ProfileStat
              icon={Trophy}
              label="Best Streak"
              value={`${currentUser.best_streak} Days`}
            />

            <ProfileStat
              icon={Medal}
              label="Current Rank"
              value={currentUser.rank}
            />

            <ProfileStat
              icon={CalendarDays}
              label="Joined"
              value={new Date(
                currentUser.created_at
              ).toLocaleDateString("en-PH", {
                month: "long",
                year: "numeric",
              })}
            />
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-[#111827] p-6">
            <h3 className="text-xl font-bold text-[#D4AF37]">
              Achievements
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unlockedAchievements.length === 0 ? (
                <p className="text-gray-400">
                  No achievements unlocked yet.
                </p>
              ) : (
                unlockedAchievements.map((item) => {
                  const achievement = Array.isArray(
                    item.achievements
                  )
                    ? item.achievements[0]
                    : item.achievements;

                  if (!achievement) {
                    return null;
                  }

                  return (
                    <AchievementBadge
                      key={item.id}
                      icon={achievement.icon}
                      title={achievement.name}
                      description={achievement.description}
                    />
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function ProfileStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111827] p-5">
      <div className="flex items-center gap-3 text-[#D4AF37]">
        <Icon className="h-5 w-5" />
        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-3 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function AchievementBadge({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-4">
      <p className="font-bold text-[#D4AF37]">
        {icon} {title}
      </p>

      <p className="mt-2 text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
}