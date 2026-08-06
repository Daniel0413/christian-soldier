import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/cards/StatsCard";
import VerseCard from "@/components/dashboard/cards/VerseCard";
import BattleCard from "@/components/dashboard/cards/BattleCard";
import RankProgressCard from "@/components/dashboard/cards/RankProgressCard";
import OrdersCard from "@/components/dashboard/cards/OrdersCard";

import { currentUser } from "@/lib/mock-data";

import {
    Flame,
    Medal,
    Trophy,
    CalendarDays,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <Header />

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Current Streak"
                    value={`${currentUser.currentStreak} Days`}
                    icon={Flame}
                />

                <StatsCard
                    title="Rank"
                    value={currentUser.rank}
                    icon={Medal}
                />

                <StatsCard
                    title="Best Streak"
                    value={`${currentUser.bestStreak} Days`}
                    icon={Trophy}
                />

                <StatsCard
                    title="Today's Status"
                    value={currentUser.status}
                    icon={CalendarDays}
                />
            </div>

            {/* Verse and Battle Cards */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <VerseCard />
                <BattleCard />
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <RankProgressCard />
                    <OrdersCard />
                </div>
            </div>
        </DashboardLayout>
    );
}