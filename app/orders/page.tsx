import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import OrderCard from "@/components/orders/OrderCard";
import { orders } from "@/lib/mock-data";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          📜 Headquarters Orders
        </h1>

        <p className="mt-2 text-gray-400">
          Read the latest announcements and battle instructions.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            title={order.title}
            description={order.description}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}