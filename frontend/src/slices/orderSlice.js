import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/api';

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const res = await axios.get(`${API}/orders`);
  return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async (data) => {
  const res = await axios.post(`${API}/orders`, data);
  return res.data;
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }) => {
  const res = await axios.put(`${API}/orders/${id}`, { status });
  return res.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; })
      .addCase(fetchOrders.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchOrders.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
      .addCase(createOrder.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateOrderStatus.fulfilled, (state, action) => { state.items = state.items.map(o => o._id === action.payload._id ? action.payload : o); });
  }
});

export default orderSlice.reducer;
