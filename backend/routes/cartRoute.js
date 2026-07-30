import express from "express";
import {
  getCarts,
  updateQuantity,
  addCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router = express.Router();

router.get("/", isAuthenticated, getCarts);
router.post("/add", isAuthenticated, addCart);
router.put("/update", isAuthenticated, updateQuantity);
router.delete("/remove", isAuthenticated, removeFromCart);

export default router;

