interface OrderCardProps {
  title: string;
  description: string;
}

export default function OrderCard({
  title,
  description,
}: OrderCardProps) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-lg font-bold text-[#D4AF37]">
        {title}
      </h2>

      <p className="mt-3 text-gray-300">
        {description}
      </p>

      <p className="mt-5 text-xs text-gray-500">
        Just now
      </p>
    </div>
  );
}