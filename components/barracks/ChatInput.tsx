"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    console.log("Message:", message);
    setMessage("");
  }

  return (
    <div className="mt-5 flex gap-3 border-t border-white/10 pt-5">
      <Input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Write an encouragement..."
        className="border-white/10 bg-[#111827] text-white"
      />

      <Button
        type="button"
        onClick={handleSend}
        className="bg-green-700 hover:bg-green-800"
      >
        <Send className="h-4 w-4" />
        Send
      </Button>
    </div>
  );
}