import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navbar(){
  const navigate = useNavigate();
  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/home" className="font-bold text-xl text-indigo-600">Peter Admin</Link>
          <Link to="/foods" className="text-gray-600 hover:text-indigo-600">Foods</Link>
          <Link to="/foods/create" className="text-gray-600 hover:text-indigo-600">Create</Link>
          <Link to="/orders" className="text-gray-600 hover:text-indigo-600">Orders</Link>
        </div>
        <div>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>
    </nav>
  );
}
