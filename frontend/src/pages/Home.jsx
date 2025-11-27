import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../slices/orderSlice";
import StatsCard from "../components/StatsCard";

export default function Home() {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.orders.items || []);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Compute unique users based on orders
  useEffect(() => {
    const uniqueUsers = new Set();
    orders.forEach((o) => {
      // Order may store user identifier under different keys depending on backend
      const userKey = o.userId || o.user_id || o.user_email || o.user;
      if (userKey) uniqueUsers.add(userKey);
    });
    setUserCount(uniqueUsers.size);
  }, [orders]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || order.total_price || 0),
    0
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Users" value={userCount} />
        <StatsCard title="Orders" value={orders.length} />
        <StatsCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
      </div>

      <div className="bg-white rounded shadow p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {orders.length === 0 && (
            <div className="text-gray-500 text-center">No recent orders</div>
          )}
          {orders.map((order) => {
            const items = Array.isArray(order.cart_data) ? order.cart_data : [];
            const itemNames = Array.isArray(order.item_names) ? order.item_names : [];

            return (
              <div key={order._id || order.id} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">Order #{order._id || order.id}</div>
                  <div className="text-sm text-gray-500">
                    {order.orderDate || order.order_date ? new Date(order.orderDate || order.order_date).toLocaleString() : "-"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Customer: {order.user_email || order.user_id || order.userId || order.user || "-"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${order.totalAmount || order.total_price}</div>
                  <div className="text-sm text-gray-500">{order.status || "-"}</div>
                  <div>
                    <p className="font-medium">Items:</p>
                    <ul>
                      {items.map((it, idx) => (
                        <li key={it.id ?? idx}>
                          {it.title} (x{it.quantity}) - ${it.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
