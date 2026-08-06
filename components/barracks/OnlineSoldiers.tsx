"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { UserRound } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface CurrentSoldier {
    id: string;
    name: string;
    rank: string;
    streak: number;
    avatarUrl: string | null;
}

interface PresenceSoldier {
    user_id: string;
    name: string;
    rank: string;
    streak: number;
    avatar_url: string | null;
    online_at: string;
}

interface OnlineSoldiersProps {
    currentSoldier: CurrentSoldier;
}

export default function OnlineSoldiers({
    currentSoldier,
}: OnlineSoldiersProps) {
    const [soldiers, setSoldiers] = useState<PresenceSoldier[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const supabase = createClient();

        const channel = supabase.channel("barracks-presence", {
            config: {
                presence: {
                    // The user's UUID becomes the Presence key.
                    key: currentSoldier.id,
                },
            },
        });

        function updatePresenceList() {
            const presenceState = channel.presenceState<PresenceSoldier>();

            /*
             * Presence state looks like:
             *
             * {
             *   "user-uuid": [{ user_id, name, rank, ... }],
             *   "another-uuid": [{ user_id, name, rank, ... }]
             * }
             */

            const uniqueSoldiers = new Map<string, PresenceSoldier>();

            Object.values(presenceState)
                .flat()
                .forEach((soldier) => {
                    uniqueSoldiers.set(soldier.user_id, soldier);
                });

            const sortedSoldiers = Array.from(
                uniqueSoldiers.values()
            ).sort((first, second) =>
                first.name.localeCompare(second.name)
            );

            setSoldiers(sortedSoldiers);
        }

        channel
            .on("presence", { event: "sync" }, () => {
                updatePresenceList();
            })
            .on("presence", { event: "join" }, () => {
                updatePresenceList();
            })
            .on("presence", { event: "leave" }, () => {
                updatePresenceList();
            })
            .subscribe(async (status, error) => {
                console.log("Barracks presence status:", status);

                if (error) {
                    console.error("Barracks presence error:", error);
                }

                if (status === "SUBSCRIBED") {
                    setConnected(true);

                    const trackStatus = await channel.track({
                        avatar_url: currentSoldier.avatarUrl,
                        user_id: currentSoldier.id,
                        name: currentSoldier.name,
                        rank: currentSoldier.rank,
                        streak: currentSoldier.streak,
                        online_at: new Date().toISOString(),
                    });

                    console.log("Barracks presence track status:", trackStatus);

                    if (trackStatus !== "ok") {
                        console.error(
                            "Unable to track Barracks presence:",
                            trackStatus
                        );
                    }
                }

                if (
                    status === "CLOSED" ||
                    status === "CHANNEL_ERROR" ||
                    status === "TIMED_OUT"
                ) {
                    setConnected(false);
                }
            });

        return () => {
            setConnected(false);
            void channel.untrack();
            void supabase.removeChannel(channel);
        };
    }, [
        currentSoldier.id,
        currentSoldier.name,
        currentSoldier.rank,
        currentSoldier.streak,
    ]);

    const onlineCount = useMemo(
        () => soldiers.length,
        [soldiers]
    );

    return (
        <aside className="h-fit rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-5">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#D4AF37]">
                    Online Soldiers
                </h2>

                <span
                    className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-green-500" : "bg-gray-500"
                        }`}
                    title={
                        connected
                            ? "Connected to Presence"
                            : "Disconnected from Presence"
                    }
                />
            </div>

            <p className="mt-2 text-sm text-gray-400">
                {onlineCount}{" "}
                {onlineCount === 1 ? "soldier" : "soldiers"} online
            </p>

            <div className="mt-5 max-h-[55vh] space-y-3 overflow-y-auto pr-1">
                {soldiers.map((soldier) => {
                    const isCurrentUser =
                        soldier.user_id === currentSoldier.id;

                    return (
                        <div
                            key={soldier.user_id}
                            className="flex items-center gap-3 rounded-lg border border-white/5 bg-[#111827] p-3"
                        >
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/10">
                                {soldier.avatar_url ? (
                                    <Image
                                        src={soldier.avatar_url}
                                        alt={soldier.name}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 object-cover"
                                    />
                                ) : (
                                    <UserRound className="h-5 w-5 text-[#D4AF37]" />
                                )}

                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111827] bg-green-500" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate font-medium text-white">
                                    {soldier.name}
                                    {isCurrentUser && (
                                        <span className="ml-1 text-xs text-gray-500">
                                            (You)
                                        </span>
                                    )}
                                </p>

                                <p className="truncate text-sm text-[#D4AF37]">
                                    {soldier.rank}
                                </p>

                                <p className="text-xs text-gray-500">
                                    🔥 {soldier.streak} Days
                                </p>
                            </div>
                        </div>
                    );
                })}

                {connected && soldiers.length === 0 && (
                    <p className="rounded-lg border border-white/10 p-4 text-center text-sm text-gray-400">
                        Synchronizing online soldiers...
                    </p>
                )}

                {!connected && (
                    <p className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center text-sm text-red-300">
                        Connecting to the Barracks...
                    </p>
                )}
            </div>
        </aside>
    );
}