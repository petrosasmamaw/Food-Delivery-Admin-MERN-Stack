import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else navigate('/login');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Register Admin</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg shadow">Register</button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-indigo-600 font-medium">Login</a>
        </div>
      </div>
    </div>
  );
}
