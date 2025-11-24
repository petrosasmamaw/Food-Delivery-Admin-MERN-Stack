import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getFoods = () => axios.get(`${API}/foods`);
export const getFood = (id) => axios.get(`${API}/foods/${id}`);
export const createFoodApi = (formData) => axios.post(`${API}/foods`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
export const updateFoodApi = (id, data) => axios.put(`${API}/foods/${id}`, data);
export const deleteFoodApi = (id) => axios.delete(`${API}/foods/${id}`);
