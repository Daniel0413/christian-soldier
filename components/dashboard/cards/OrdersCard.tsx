export default function OrdersCard() {
  const orders = [
    "Victory report submitted.",
    "Welcome to Christian Soldier.",
    "Remember to report at 6:00 PM.",
  ];

  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        🔔 Orders
      </h2>

      <div className="mt-6 space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="rounded-lg bg-[#111827] p-4"
          >
            <p className="text-gray-300">
              {order}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}