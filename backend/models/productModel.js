import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productDesc: {
      type: String,
      required: true,
      trim: true,
    },

    productImage: [
      {
        URL: {
          type: String,
          required: true,
          trim: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    productPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
