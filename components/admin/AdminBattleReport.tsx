"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { adminSubmitBattleReport } from "@/lib/actions/adminSubmitBattleReport";

interface Soldier {
  id: string;
  display_name: string;
  rank: string;
}

interface AdminBattleReportProps {
  soldiers: Soldier[];
  today: string;
}

export default function AdminBattleReport({
  soldiers,
  today,
}: AdminBattleReportProps) {
  const router = useRouter();

  const [soldierId, setSoldierId] =
    useState("");

  const [reportDate, setReportDate] =
    useState(today);

  const [result, setResult] = useState<
    "Victory" | "Defeat" | ""
  >("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (!soldierId) {
      toast.error("Please select a soldier.");
      return;
    }

    if (!reportDate) {
      toast.error("Please select a date.");
      return;
    }

    if (!result) {
      toast.error(
        "Please select Victory or Defeat."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "soldier_id",
        soldierId
      );

      formData.append(
        "report_date",
        reportDate
      );

      formData.append(
        "result",
        result
      );

      const response =
        await adminSubmitBattleReport(
          formData
        );

      toast.success(
        `${response.soldierName}'s ${result} was recorded successfully.`
      );

      setSoldierId("");
      setResult("");
      setReportDate(today);

      router.refresh();
    } catch (error) {
      console.error(
        "Admin report error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to record battle report."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/10">
          <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#D4AF37]">
            Record Soldier Battle
          </h2>

          <p className="text-sm text-gray-400">
            Record a missed report on behalf
            of a soldier.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {/* Soldier */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Soldier
          </label>

          <select
            value={soldierId}
            onChange={(event) =>
              setSoldierId(
                event.target.value
              )
            }
            disabled={loading}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-white outline-none focus:border-[#D4AF37]"
          >
            <option value="">
              Select a soldier
            </option>

            {soldiers.map((soldier) => (
              <option
                key={soldier.id}
                value={soldier.id}
              >
                {soldier.display_name} —{" "}
                {soldier.rank}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Report Date
          </label>

          <input
            type="date"
            value={reportDate}
            max={today}
            onChange={(event) =>
              setReportDate(
                event.target.value
              )
            }
            disabled={loading}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-white outline-none focus:border-[#D4AF37]"
          />

          <p className="mt-2 text-xs text-gray-500">
            Future dates cannot be recorded.
          </p>
        </div>

        {/* Result */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Battle Result
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              disabled={loading}
              onClick={() =>
                setResult("Victory")
              }
              className={`h-12 ${
                result === "Victory"
                  ? "bg-green-600 ring-2 ring-green-300"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              ✅ Victory
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={loading}
              onClick={() =>
                setResult("Defeat")
              }
              className={`h-12 ${
                result === "Defeat"
                  ? "ring-2 ring-red-300"
                  : ""
              }`}
            >
              ❌ Defeat
            </Button>
          </div>
        </div>

        <Button
          type="button"
          disabled={
            loading ||
            !soldierId ||
            !reportDate ||
            !result
          }
          onClick={handleSubmit}
          className="w-full bg-[#D4AF37] text-black hover:bg-yellow-500"
        >
          {loading
            ? "Recording..."
            : "Record Battle Report"}
        </Button>
      </div>
    </section>
  );
}