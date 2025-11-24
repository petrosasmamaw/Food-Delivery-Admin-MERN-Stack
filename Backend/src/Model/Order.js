import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
