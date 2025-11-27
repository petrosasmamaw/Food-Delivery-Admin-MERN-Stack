import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import foodRoutes from "./Route/foodRouter.js";
import orderRoutes from "./Route/orderRouter.js";

dotenv.config();
const app = express();

// Fix paths because we are inside /src
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder located OUTSIDE src
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
