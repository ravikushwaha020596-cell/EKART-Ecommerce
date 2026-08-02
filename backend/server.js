import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./database/db.js";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ekart-ecommerce-gamma.vercel.app",
      "https://ekart-ecommerce-livid.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ekart Backend API is Running",
  });
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});