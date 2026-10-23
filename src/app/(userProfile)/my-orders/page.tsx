
import MyOrders from "@/components/userDashboard/order/MyOrders";
import { getAllOrder } from "@/services/order.api";

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const { data: orderList } = await getAllOrder();

  const orders = orderList?.data ?? [];

  return (
    <div>
      <MyOrders orders={orders} />
    </div>
  );
}
