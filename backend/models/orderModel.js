import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    amount: {
       type: Number,
        required: true,
         min: 0 
     },
    tax: {
       type: Number,
        required: true,
        default: 0 ,
         min: 0,
        },

    shipping: {
       type: Number, 
       required: true,
        default: 0,
         min: 0,
      },

    currency: { 
      type: String,
       default: "INR",
       trim: true,
      },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    // Razorpay fields
    razorpayOrderId: {
       type: String ,
       default: null,
      },
    razorpayPaymentId: {
       type: String ,
        default: null,
      },
    razorpaySignature: {
       type: String,
        default: null,
   },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
