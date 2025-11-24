import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import foodRoutes from "./Route/foodrouter.js";   // FIXED
import orderRoutes from "./Route/orderRouter.js"; // FIXED

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

// FIXED ROUTES
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
