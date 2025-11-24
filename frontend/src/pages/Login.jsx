import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/home');
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
