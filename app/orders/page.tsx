import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { getOrders } from "@/lib/actions/getOrders";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const orders = await getOrders();

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-3xl font-bold text-white">
        📜 Headquarters Orders
      </h1>

      <div className="space-y-5">
        {orders.length === 0 ? (
          <p className="text-gray-400">
            No orders available.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-[#D4AF37]/20 bg-[#0B1220] p-6"
            >
              <h2 className="text-xl font-bold text-white">
                {order.icon} {order.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-300">
                {order.description}
              </p>

              <p className="mt-4 text-xs text-gray-500">
                {new Date(
                  order.created_at
                ).toLocaleDateString("en-PH")}
              </p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}