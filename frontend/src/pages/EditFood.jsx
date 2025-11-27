import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFood, fetchFoods } from '../slices/foodSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditFood(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const foods = useSelector(s => s.foods.items || []);
  const existing = foods.find(f => f._id === id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name:'', price:'', description:'', category:'' });

  useEffect(()=>{
    if (!foods.length) dispatch(fetchFoods());
    if (existing) setForm({ name: existing.name, price: existing.price, description: existing.description, category: existing.category });
  },[dispatch, existing, foods.length]);

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(updateFood({ id, data: form }));
    navigate('/foods');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Food</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Name" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200" />
        <input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder="Price" type="number" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200" />
        <input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} placeholder="Category" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200" />
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="w-full p-3 border border-gray-200 rounded-lg h-28"></textarea>
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg">Save</button>
          <button type="button" onClick={()=>navigate('/foods')} className="flex-1 border border-gray-200 px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
}
