"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createOrder } from "@/lib/actions/createOrder";
import { saveDailyVerse } from "@/lib/actions/saveDailyVerse";

interface AdminFormsProps {
  today: string;
}

export default function AdminForms({
  today,
}: AdminFormsProps) {
  const [orderLoading, setOrderLoading] = useState(false);
  const [verseLoading, setVerseLoading] = useState(false);

  async function handleOrderSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setOrderLoading(true);

      await createOrder(formData);

      toast.success("Order published successfully.");
      form.reset();
    } catch (error) {
      console.error("Publish order error:", error);

      toast.error("Unable to publish the order.", {
        description:
          error instanceof Error
            ? error.message
            : undefined,
      });
    } finally {
      setOrderLoading(false);
    }
  }

  async function handleVerseSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setVerseLoading(true);

      await saveDailyVerse(formData);

      toast.success("Daily verse published successfully.");
    } catch (error) {
      console.error("Save daily verse error:", error);

      toast.error("Unable to save the daily verse.", {
        description:
          error instanceof Error
            ? error.message
            : undefined,
      });
    } finally {
      setVerseLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
        <h2 className="text-2xl font-bold text-[#D4AF37]">
          📜 Publish Order
        </h2>

        <form
          onSubmit={handleOrderSubmit}
          className="mt-6 space-y-4"
        >
          <Input
            name="icon"
            placeholder="Icon, for example: ⚔"
            defaultValue="📜"
            className="border-white/10 bg-[#111827] text-white"
          />

          <Input
            name="title"
            placeholder="Order title"
            required
            className="border-white/10 bg-[#111827] text-white"
          />

          <textarea
            name="description"
            placeholder="Order description"
            required
            rows={5}
            className="w-full rounded-lg border border-white/10 bg-[#111827] p-3 text-white outline-none focus:border-[#D4AF37]"
          />

          <Button
            type="submit"
            disabled={orderLoading}
            className="w-full bg-green-700 hover:bg-green-800"
          >
            {orderLoading
              ? "Publishing..."
              : "Publish Order"}
          </Button>
        </form>
      </section>

      <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
        <h2 className="text-2xl font-bold text-[#D4AF37]">
          📖 Daily Verse
        </h2>

        <form
          onSubmit={handleVerseSubmit}
          className="mt-6 space-y-4"
        >
          <Input
            name="reference"
            placeholder="Reference, for example: Joshua 1:9"
            required
            className="border-white/10 bg-[#111827] text-white"
          />

          <textarea
            name="verse"
            placeholder="Verse text"
            required
            rows={5}
            className="w-full rounded-lg border border-white/10 bg-[#111827] p-3 text-white outline-none focus:border-[#D4AF37]"
          />

          <Input
            name="verse_date"
            type="date"
            defaultValue={today}
            required
            className="border-white/10 bg-[#111827] text-white"
          />

          <Button
            type="submit"
            disabled={verseLoading}
            className="w-full bg-green-700 hover:bg-green-800"
          >
            {verseLoading
              ? "Saving..."
              : "Save Daily Verse"}
          </Button>
        </form>
      </section>
    </div>
  );
}