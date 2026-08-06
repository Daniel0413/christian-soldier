"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/actions/getCurrentAdmin";

export async function createOrder(formData: FormData) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Unauthorized.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? ""
  ).trim();
  const icon = String(formData.get("icon") ?? "📜").trim();

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("orders").insert({
    icon: icon || "📜",
    title,
    description,
  });

  if (error) {
    throw error;
  }

  // Get every soldier
  const { data: soldiers, error: soldiersError } =
    await supabase
      .from("profiles")
      .select("id");

  if (soldiersError) {
    console.error(
      "Unable to load soldiers:",
      soldiersError
    );
  } else if (soldiers.length > 0) {
    const notifications = soldiers.map((soldier) => ({
      user_id: soldier.id,
      type: "order",
      title: "New Headquarters Order",
      message: `${icon || "📜"} ${title}`,
      link: "/orders",
    }));

    const { error: notificationError } =
      await supabase
        .from("notifications")
        .insert(notifications);

    if (notificationError) {
      console.error(
        "Order notification error:",
        notificationError
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath("/orders");
  revalidatePath("/dashboard");
  revalidatePath("/notifications");
}