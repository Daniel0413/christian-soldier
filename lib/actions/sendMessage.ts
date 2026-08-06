"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function sendMessage(message: string) {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    throw new Error("Message cannot be empty.");
  }

  if (trimmedMessage.length > 1000) {
    throw new Error("Message is too long.");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { error } = await supabase.from("messages").insert({
    user_id: user.id,
    message: trimmedMessage,
  });

  if (error) {
    throw error;
  }

  revalidatePath("/barracks");
}