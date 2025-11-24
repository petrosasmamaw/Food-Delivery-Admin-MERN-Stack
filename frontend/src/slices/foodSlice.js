import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/foods";

export const fetchFoods = createAsyncThunk("foods/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const deleteFood = createAsyncThunk("foods/delete", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

export const createFood = createAsyncThunk("foods/create", async (formData) => {
  const res = await axios.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
});

export const updateFood = createAsyncThunk("foods/update", async ({ id, data }) => {
  const res = await axios.put(`${API}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
});

const foodSlice = createSlice({
  name: "foods",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => { state.status = "loading"; })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.items = state.items.filter(f => f._id !== action.payload);
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.items = state.items.map(f => f._id === action.payload._id ? action.payload : f);
      });
  }
});

export default foodSlice.reducer;
