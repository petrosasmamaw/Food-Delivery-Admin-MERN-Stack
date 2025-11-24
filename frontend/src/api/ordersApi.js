import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getOrders = () => axios.get(`${API}/orders`);
export const updateOrderApi = (id, status) => axios.put(`${API}/orders/${id}`, { status });
