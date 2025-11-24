import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFood } from '../slices/foodSlice';
import { useNavigate } from 'react-router-dom';

export default function CreateFood(){
  const [form, setForm] = useState({ name:'', price:'', description:'', category:'' });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('description', form.description);
    data.append('category', form.category);
    if (file) data.append('image', file);
    await dispatch(createFood(data));
    navigate('/foods');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Food</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder="Price" type="number" className="w-full p-2 border rounded" />
        <input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} placeholder="Category" className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <div className="flex gap-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
          <button type="button" onClick={()=>navigate('/foods')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
