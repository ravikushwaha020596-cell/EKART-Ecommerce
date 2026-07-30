import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/getallproducts", getAllProducts);

router.post("/add", isAuthenticated, isAdmin, multipleUpload, addProduct);
router.put(
  "/update/:productId",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct,
);
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProduct);

export default router;
