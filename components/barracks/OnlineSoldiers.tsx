const soldiers = [
  { name: "Genesis", rank: "Sergeant" },
  { name: "Timothy", rank: "Corporal" },
  { name: "Renz Daniel", rank: "Recruit" },
  { name: "Braver", rank: "Recruit" },
];

export default function OnlineSoldiers() {
  return (
    <aside className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-5">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        Online Soldiers
      </h2>

      <div className="mt-5 space-y-4">
        {soldiers.map((soldier) => (
          <div
            key={soldier.name}
            className="flex items-center gap-3"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <div>
              <p className="font-medium text-white">
                {soldier.name}
              </p>

              <p className="text-sm text-gray-400">
                {soldier.rank}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}