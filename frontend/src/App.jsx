import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Foods from './pages/Foods';
import CreateFood from './pages/CreateFood';
import EditFood from './pages/EditFood';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/foods" element={<Foods/>} />
            <Route path="/foods/create" element={<CreateFood/>} />
            <Route path="/foods/edit/:id" element={<EditFood/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
