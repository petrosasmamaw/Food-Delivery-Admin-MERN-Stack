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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="space-y-4">
        {orders.map(o => (
          <div key={o._id} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <div className="font-semibold">Order #{o._id}</div>
              <div className="text-sm text-gray-500">{o.userId || o.user_email || '-'} — {o.items?.length || 0} items</div>
              <div className="mt-2 text-sm text-gray-600">{o.orderDate ? new Date(o.orderDate).toLocaleString() : ''}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-gray-900">${o.totalAmount}</div>
              <select value={o.status} onChange={(e)=>changeStatus(o._id, e.target.value)} className="border rounded-lg p-2">
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
