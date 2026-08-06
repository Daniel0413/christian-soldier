import { createClient } from "@/lib/supabase/server";

export async function getOrders(limit?: number) {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select("id, icon, title, description, created_at")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Orders error:", error);
    return [];
  }

  return data ?? [];
}