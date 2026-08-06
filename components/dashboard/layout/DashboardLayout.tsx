import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import MobileDashboardLayout from "@/components/dashboard/layout/MobileDashboardLayout";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <MobileDashboardLayout
      name={currentUser.display_name}
      rank={currentUser.rank}
      avatarUrl={currentUser.avatar_url}
    >
      {children}
    </MobileDashboardLayout>
  );
}