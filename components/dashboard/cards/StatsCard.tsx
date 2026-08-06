import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6 transition hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-full bg-[#D4AF37]/10 p-3">
          <Icon className="h-7 w-7 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
}