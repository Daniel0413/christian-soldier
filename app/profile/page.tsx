import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-data";

import {
  CalendarDays,
  Flame,
  Medal,
  Trophy,
  UserRound,
} from "lucide-react";

export default function ProfilePage() {
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

          <Button className="bg-green-700 hover:bg-green-800">
            Edit Profile
          </Button>
        </div>

        <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              <UserRound className="h-14 w-14 text-[#D4AF37]" />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-white">
              {currentUser.name}
            </h2>

            <p className="mt-2 text-lg font-semibold text-[#D4AF37]">
              {currentUser.rank}
            </p>

            <p className="mt-3 max-w-xl text-gray-400">
              {currentUser.bio}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ProfileStat
              icon={Flame}
              label="Current Streak"
              value={`${currentUser.currentStreak} Days`}
            />

            <ProfileStat
              icon={Trophy}
              label="Best Streak"
              value={`${currentUser.bestStreak} Days`}
            />

            <ProfileStat
              icon={Medal}
              label="Current Rank"
              value={currentUser.rank}
            />

            <ProfileStat
              icon={CalendarDays}
              label="Joined"
              value={currentUser.joined}
            />
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-[#111827] p-6">
            <h3 className="text-xl font-bold text-[#D4AF37]">
              Achievements
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AchievementBadge
                title="First Victory"
                description="Won your first daily battle."
              />

              <AchievementBadge
                title="7-Day Warrior"
                description="Maintained a seven-day streak."
              />

              <AchievementBadge
                title="Faithful Recruit"
                description="Stayed active in the community."
              />
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
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-4">
      <p className="font-bold text-[#D4AF37]">
        🏅 {title}
      </p>

      <p className="mt-2 text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
}