import React from 'react';
export default function StatsCard({title, value}) {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
