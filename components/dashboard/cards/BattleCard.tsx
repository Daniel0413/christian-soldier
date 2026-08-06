"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { submitBattleReport } from "@/lib/actions/submitBattleReport";

type BattleResult = "Victory" | "Defeat";

interface BattleReport {
  result: BattleResult;
  created_at?: string;
}

interface UnlockedAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
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

  const [
    unlockedAchievements,
    setUnlockedAchievements,
  ] = useState<UnlockedAchievement[]>([]);

  const [
    achievementDialogOpen,
    setAchievementDialogOpen,
  ] = useState(false);

  async function handleSubmit() {
    if (!selected) {
      toast.error("Please choose Victory or Defeat.");
      return;
    }

    try {
      setLoading(true);

      const result = await submitBattleReport(selected);

      if (selected === "Victory") {
        toast.success("Victory recorded successfully!", {
          description: `Current streak: ${result.currentStreak} days`,
        });
      } else {
        toast.success("Battle report submitted.", {
          description: "Your current streak has been reset.",
        });
      }

      if (
        result.unlockedAchievements &&
        result.unlockedAchievements.length > 0
      ) {
        setUnlockedAchievements(
          result.unlockedAchievements
        );

        setAchievementDialogOpen(true);

        result.unlockedAchievements.forEach(
          (achievement) => {
            toast.success(
              `${achievement.icon} Achievement unlocked!`,
              {
                description: achievement.name,
              }
            );
          }
        );
      }

      setSelected(null);
      router.refresh();
    } catch (error) {
      console.error("Battle report error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to submit your report.";

      if (
        errorMessage
          .toLowerCase()
          .includes("already submitted")
      ) {
        toast.error(
          "You already submitted today's report."
        );
      } else {
        toast.error("Unable to submit battle report.", {
          description: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {report ? (
        <SubmittedReport report={report} />
      ) : (
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
              onClick={() =>
                setSelected("Victory")
              }
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
              onClick={() =>
                setSelected("Defeat")
              }
              className={`h-14 ${
                selected === "Defeat"
                  ? "ring-2 ring-red-300"
                  : ""
              }`}
            >
              ❌ Defeat
            </Button>
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selected || loading}
            className="mt-5 w-full bg-[#D4AF37] text-black hover:bg-yellow-500"
          >
            {loading
              ? "Submitting..."
              : "Submit Report"}
          </Button>
        </div>
      )}

      <Dialog
        open={achievementDialogOpen}
        onOpenChange={setAchievementDialogOpen}
      >
        <DialogContent className="border-[#D4AF37]/30 bg-[#111827] text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-[#D4AF37]">
              🎉 Achievement Unlocked!
            </DialogTitle>

            <DialogDescription className="text-center text-gray-400">
              Your faithful progress has earned a new
              achievement.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {unlockedAchievements.map(
              (achievement) => (
                <div
                  key={achievement.id}
                  className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-5 text-center"
                >
                  <p className="text-5xl">
                    {achievement.icon}
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-[#D4AF37]">
                    {achievement.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              )
            )}

            <Button
              type="button"
              onClick={() =>
                setAchievementDialogOpen(false)
              }
              className="w-full bg-green-700 hover:bg-green-800"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SubmittedReport({
  report,
}: {
  report: BattleReport;
}) {
  const isVictory =
    report.result === "Victory";

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
          {isVictory
            ? "✅ Victory"
            : "❌ Defeat"}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Your report has been submitted for today.
        </p>
      </div>
    </div>
  );
}