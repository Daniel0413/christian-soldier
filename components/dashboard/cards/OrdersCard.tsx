interface Order {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface OrdersCardProps {
  orders: Order[];
}

export default function OrdersCard({
  orders,
}: OrdersCardProps) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">
        📜 Headquarters Orders
      </h2>

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-400">
            No orders have been published.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-white/10 bg-[#111827] p-4"
            >
              <h3 className="font-semibold text-white">
                {order.icon} {order.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {order.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}