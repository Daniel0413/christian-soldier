"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import type { RealtimeChannel } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/actions/sendMessage";
import { createClient } from "@/lib/supabase/client";

export default function ChatInput() {
  const router = useRouter();
  const channelRef = useRef<RealtimeChannel | null>(null);

  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("barracks-room")
      .subscribe();

    channelRef.current = channel;

    return () => {
      channelRef.current = null;
      void supabase.removeChannel(channel);
    };
  }, []);

  async function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("");

      // Save permanently in the database.
      await sendMessage(trimmedMessage);

      // Tell all open Barracks pages to fetch the new message.
      await channelRef.current?.send({
        type: "broadcast",
        event: "new_message",
        payload: {
          createdAt: new Date().toISOString(),
        },
      });

      setMessage("");
      router.refresh();
    } catch (error) {
      console.error("Send message error:", error);
      setStatusMessage("Unable to send your message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 border-t border-white/10 pt-5">
      <div className="flex gap-3">
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void handleSend();
            }
          }}
          maxLength={1000}
          placeholder="Write an encouragement..."
          className="border-white/10 bg-[#111827] text-white"
        />

        <Button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="bg-green-700 hover:bg-green-800"
        >
          <Send className="h-4 w-4" />
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>

      {statusMessage && (
        <p className="mt-3 text-sm text-red-400">
          {statusMessage}
        </p>
      )}
    </div>
  );
}