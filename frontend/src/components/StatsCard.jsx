import React from 'react';

export default function StatsCard({ title, value }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-sm text-gray-400 uppercase tracking-wide">{title}</h3>
      <p className="mt-2 text-3xl font-extrabold text-gray-900">{value}</p>
      <div className="mt-3 text-xs text-gray-500">Updated just now</div>
    </div>
  );
}
