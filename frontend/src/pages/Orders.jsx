import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../slices/orderSlice';

export default function Orders(){
  const dispatch = useDispatch();
  const orders = useSelector(s => s.orders.items || []);

  useEffect(()=>{ dispatch(fetchOrders()); },[dispatch]);

  const changeStatus = async (id, status) => {
    await dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o._id} className="bg-white rounded shadow p-4 flex justify-between">
            <div>
              <div className="font-semibold">Order #{o._id}</div>
              <div className="text-sm text-gray-500">{o.userId} — {o.items?.length || 0} items</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-semibold">${o.totalAmount}</div>
              <select value={o.status} onChange={(e)=>changeStatus(o._id, e.target.value)} className="border rounded p-1">
                <option>Pending</option>
                <option>Preparing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
