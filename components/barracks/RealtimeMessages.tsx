"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RealtimeMessages() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            const container = document.getElementById(
                "messages-container"
            );

            container?.scrollTo({
                top: container.scrollHeight,
            });
        }, 200);
        const supabase = createClient();

        const channel = supabase
            .channel("barracks-room")
            .on(
                "broadcast",
                {
                    event: "new_message",
                },
                () => {
                    console.log("New barracks message received");
                    router.refresh();
                    setTimeout(() => {
                        const container = document.getElementById(
                            "messages-container"
                        );

                        container?.scrollTo({
                            top: container.scrollHeight,
                            behavior: "smooth",
                        });
                    }, 100);
                }
            )
            .subscribe((status) => {
                console.log("Barracks broadcast status:", status);
            });

        return () => {
            void supabase.removeChannel(channel);
        };
    }, [router]);

    return null;
}