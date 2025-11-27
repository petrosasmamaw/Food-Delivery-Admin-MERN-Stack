import express from "express";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
} from "../Controller/orderController.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
