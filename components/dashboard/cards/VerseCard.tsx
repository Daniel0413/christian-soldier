interface VerseCardProps {
  reference: string;
  verse: string;
}

export default function VerseCard({
  reference,
  verse,
}: VerseCardProps) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        📖 Verse of the Day
      </h2>

      <p className="mt-6 text-lg italic leading-8 text-gray-200">
        “{verse}”
      </p>

      <p className="mt-4 font-medium text-[#D4AF37]">
        — {reference}
      </p>
    </div>
  );
}