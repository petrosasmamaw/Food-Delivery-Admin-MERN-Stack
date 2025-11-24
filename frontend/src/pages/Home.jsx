import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../slices/orderSlice';
import StatsCard from '../components/StatsCard';

export default function Home(){
  const dispatch = useDispatch();
  const orders = useSelector(s => s.orders.items || []);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    dispatch(fetchOrders());
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('profiles').select('id');
      if (!error) setUserCount(data?.length ?? 0);
    };
    fetchUsers();
  },[dispatch]);

  const totalMoney = orders.reduce((s,o)=>s + (o.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Users" value={userCount} />
        <StatsCard title="Orders" value={orders.length} />
        <StatsCard title="Total Revenue" value={`$${totalMoney.toFixed(2)}`} />
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {orders.map(o => (
            <div key={o._id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">Order #{o._id}</div>
                <div className="text-sm text-gray-500">{o.orderDate ? new Date(o.orderDate).toLocaleString() : ''}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${o.totalAmount}</div>
                <div className="text-sm text-gray-500">{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
