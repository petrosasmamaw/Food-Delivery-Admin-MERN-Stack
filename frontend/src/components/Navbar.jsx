import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white/60 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/home" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">P</div>
            <div>
              <div className="font-bold text-lg text-gray-900">Peter Admin</div>
              <div className="text-xs text-gray-400">Food Delivery Dashboard</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/foods" className="text-sm text-gray-600 hover:text-indigo-600">Foods</Link>
            <Link to="/foods/create" className="text-sm text-gray-600 hover:text-indigo-600">Create</Link>
            <Link to="/orders" className="text-sm text-gray-600 hover:text-indigo-600">Orders</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={logout} className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-95">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
