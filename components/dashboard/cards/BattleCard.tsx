import { Button } from "@/components/ui/button";

export default function BattleCard() {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        ⚔ Daily Battle Report
      </h2>

      <p className="mt-4 text-gray-400">
        Report today's spiritual battle at 6:00 PM.
      </p>

      <div className="mt-8 flex gap-4">
        <Button className="flex-1 bg-green-700 hover:bg-green-800">
          Victory
        </Button>

        <Button
          variant="destructive"
          className="flex-1"
        >
          Defeat
        </Button>
      </div>
    </div>
  );
}