import { createClient } from "@/lib/supabase/server";

function getPhilippinesDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Manila",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

export async function getMessages() {
    const supabase = await createClient();
    const today = getPhilippinesDate();

    const { data: messages, error: messagesError } = await supabase
        .from("messages")
        .select(`
    id,
    user_id,
    message,
    created_at,
    profiles!messages_user_id_fkey (
      display_name,
      rank,
      current_streak,
      avatar_url
    )
  `)
        .order("created_at", { ascending: true })
        .limit(100);

    if (messagesError) {
        console.error("Messages error:", messagesError);
        return [];
    }

    if (!messages || messages.length === 0) {
        return [];
    }

    const userIds = [...new Set(messages.map((message) => message.user_id))];

    const { data: reports, error: reportsError } = await supabase
        .from("battle_reports")
        .select("user_id, result")
        .in("user_id", userIds)
        .eq("report_date", today);

    if (reportsError) {
        console.error("Battle status error:", reportsError);
    }

    const statusByUser = new Map(
        (reports ?? []).map((report) => [
            report.user_id,
            report.result as "Victory" | "Defeat",
        ])
    );

    return messages.map((message) => ({
        ...message,
        status:
            statusByUser.get(message.user_id) ??
            ("Awaiting" as const),
    }));
}