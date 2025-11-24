import express from "express";
import upload from "../middleware/upload.js";
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} from "../Controller/foodController.js";

const router = express.Router();

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", upload.single("image"), createFood);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/:id", deleteFood);

export default router;
