"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";

interface Props {
    children: React.ReactNode;
    name: string;
    rank: string;
    avatarUrl: string | null;
}

export default function MobileDashboardLayout({
    children,
    name,
    rank,
    avatarUrl,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#111827] text-white">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <div onClick={() => setOpen(false)}>
                    <Sidebar
                        name={name}
                        rank={rank}
                        avatarUrl={avatarUrl}
                    />
                </div>
            </div>

            {/* Mobile Sidebar */}
            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setOpen(false)}
                    />

                    <div className="fixed left-0 top-0 z-50 lg:hidden">
                        <Sidebar
                            name={name}
                            rank={rank}
                            avatarUrl={avatarUrl}
                        />
                    </div>
                </>
            )}

            <main className="flex-1">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0B1220] px-4 py-4 lg:hidden">
                    <button onClick={() => setOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </button>

                    <h2 className="font-bold text-[#D4AF37]">
                        Christian Soldier
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className={open ? "" : "invisible"}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </header>

                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}