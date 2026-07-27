import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getCarts,
  updateQuantity,
  addCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", isAuthenticated, getCarts);
router.post("/add", isAuthenticated, addCart);
router.put("/update", isAuthenticated, updateQuantity);
router.delete("/remove", isAuthenticated, removeFromCart);

export default router;

