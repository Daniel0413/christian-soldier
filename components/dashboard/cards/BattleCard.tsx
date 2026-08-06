"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { submitBattleReport } from "@/lib/actions/submitBattleReport";

type BattleResult = "Victory" | "Defeat";

interface BattleReport {
  result: BattleResult;
  created_at?: string;
}

interface BattleCardProps {
  report: BattleReport | null;
}

export default function BattleCard({
  report,
}: BattleCardProps) {
  const router = useRouter();

  const [selected, setSelected] =
    useState<BattleResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!selected) {
      setMessage("Please choose Victory or Defeat.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await submitBattleReport(selected);

      setMessage("Battle report submitted successfully.");

      router.refresh();
    } catch (error) {
      console.error("Battle report error:", error);

      setMessage(
        "Unable to submit your report. You may have already reported today."
      );
    } finally {
      setLoading(false);
    }
  }

  if (report) {
    const isVictory = report.result === "Victory";

    return (
      <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
        <h2 className="text-xl font-bold text-[#D4AF37]">
          ⚔ Today&apos;s Battle Report
        </h2>

        <div
          className={`mt-6 rounded-xl border p-5 ${
            isVictory
              ? "border-green-500/30 bg-green-500/10"
              : "border-red-500/30 bg-red-500/10"
          }`}
        >
          <p
            className={`text-2xl font-bold ${
              isVictory
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {isVictory ? "✅ Victory" : "❌ Defeat"}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Your report has been submitted for today.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        ⚔ Daily Battle Report
      </h2>

      <p className="mt-4 text-gray-400">
        How did today&apos;s spiritual battle go?
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Button
          type="button"
          onClick={() => {
            setSelected("Victory");
            setMessage("");
          }}
          className={`h-14 ${
            selected === "Victory"
              ? "bg-green-600 ring-2 ring-green-300"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          ✅ Victory
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setSelected("Defeat");
            setMessage("");
          }}
          className={`h-14 ${
            selected === "Defeat"
              ? "ring-2 ring-red-300"
              : ""
          }`}
        >
          ❌ Defeat
        </Button>
      </div>

      {message && (
        <p className="mt-4 rounded-lg border border-white/10 bg-[#111827] p-3 text-sm text-gray-300">
          {message}
        </p>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!selected || loading}
        className="mt-5 w-full bg-[#D4AF37] text-black hover:bg-yellow-500"
      >
        {loading ? "Submitting..." : "Submit Report"}
      </Button>
    </div>
  );
}