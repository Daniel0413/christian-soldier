import { Progress } from "@/components/ui/progress";

export default function RankProgressCard() {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        🎖 Rank Progress
      </h2>

      <p className="mt-6 text-lg text-white">
        Recruit
      </p>

      <Progress
        value={45}
        className="mt-4"
      />

      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>3 / 7 Victories</span>
        <span>Next: Private</span>
      </div>
    </div>
  );
}