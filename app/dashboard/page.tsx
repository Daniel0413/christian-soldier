import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/cards/StatsCard";
import VerseCard from "@/components/dashboard/cards/VerseCard";
import BattleCard from "@/components/dashboard/cards/BattleCard";
import RankProgressCard from "@/components/dashboard/cards/RankProgressCard";
import OrdersCard from "@/components/dashboard/cards/OrdersCard";

import { getOrders } from "@/lib/actions/getOrders";
import { getTodayVerse } from "@/lib/actions/getTodayVerse";
import { getTodayBattleReport } from "@/lib/actions/getTodayBattleReport";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getNotifications } from "@/lib/actions/getNotifications";

import { redirect } from "next/navigation";

import {
    Flame,
    Medal,
    Trophy,
    CalendarDays,
} from "lucide-react";

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }
    const notifications = await getNotifications();

    const unreadCount = notifications.filter(
        (notification) => !notification.is_read
    ).length;
    const todayReport = await getTodayBattleReport();
    const todayVerse = await getTodayVerse();
    const orders = await getOrders(3);

    const todayStatus = todayReport
        ? todayReport.result
        : "Awaiting Report";

    return (
        <DashboardLayout>
            <Header
                name={currentUser.display_name}
                rank={currentUser.rank}
                avatarUrl={currentUser.avatar_url}
                unreadCount={unreadCount}
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Current Streak"
                    value={`${currentUser.current_streak} Days`}
                    icon={Flame}
                />

                <StatsCard
                    title="Rank"
                    value={currentUser.rank}
                    icon={Medal}
                />

                <StatsCard
                    title="Best Streak"
                    value={`${currentUser.best_streak} Days`}
                    icon={Trophy}
                />

                <StatsCard
                    title="Today's Status"
                    value={todayStatus}
                    icon={CalendarDays}
                />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <VerseCard
                    reference={
                        todayVerse?.reference ?? "1 Timothy 6:12"
                    }
                    verse={
                        todayVerse?.verse ??
                        "Fight the good fight of the faith."
                    }
                />

                <BattleCard report={todayReport} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <RankProgressCard
                    streak={currentUser.current_streak}
                />

                <OrdersCard orders={orders} />
            </div>
        </DashboardLayout>
    );
}