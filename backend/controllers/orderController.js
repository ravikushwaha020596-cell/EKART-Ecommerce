import razorpayInstance from "../config/razorpay.js";
import { Order } from "../models/orderModel.js";
import crypto from "crypto";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";


export const createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shipping, currency } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products are required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // convert to paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);
    // save order in DB
    const newOrder = await Order.create({
      user: req.user._id,
      products,
      amount,
      tax,
      shipping,
      currency: currency || "INR",
      status: "Pending",
      razorpayOrderId: razorpayOrder.id,
    });

     return res.status(200).json({
      success: true,
      order: razorpayOrder,
      dbOrder: newOrder,
    });


  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({ 
      success: false,
       message:"Internal Server Error",
       });
  }
};



// Verify Payment

export const VerifyPayment = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentFailed,
    } = req.body;
    
    console.log("ORDER ID:", razorpay_order_id);
    console.log("PAYMENT ID:", razorpay_payment_id);
    console.log("SIGNATURE:", razorpay_signature);

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }
    
    const userId = req.user._id;
    if (paymentFailed) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" },
        { new: true },
      );

      return res
        .status(400)
        .json({ success: false, message: "payment failed", order });
    }
    if (
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

console.log("EXPECTED:", expectedSignature);
console.log("RECEIVED:", razorpay_signature);

      if (expectedSignature !== razorpay_signature) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" }
      );

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
    
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true },
      );

      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [], totalPrice: 0 } },
      );
       return res.status(200).json({
      success: true,
      message: "Payment successful",
      order,
    });

     } catch (error) {
    console.error("Verify Payment Error:", error);
   return  res.status(500).json({ success: false, message: "Internal Server Error", });
  }
};




// Get My Orders

export const getMyOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImage",
      })

      .populate("user", "firstName lastName email");
   return  res.status(200).json({
    
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// Get User Orders (Admin)
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImage",
      }) 

      //fetch product details
      .populate("user", "firstName lastName email"); // fetch user info
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });


  } catch (error) {
   console.error("Get User Orders Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Get All Orders (Admin)
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email role") // fetch user info
      .populate({
        path: "products.productId",
        select: "productName productPrice productImage",
      });
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get All Orders Error:", error);

   return  res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// Get Order Details (Admin)

export const getSalesData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({ status: "Paid" });

    // Total sales amount
    const totalSaleAgg = await Order.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalSales = Number((totalSaleAgg[0]?.total || 0).toFixed(2));

    // Sales grouped by date (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const salesByDate = await Order.aggregate([
      { $match: { status: "Paid", createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
   
    const formattedSales = salesByDate.map((item) => ({
      date: item._id,
      amount: item.amount,
    }));
    return res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      sales: formattedSales,
    });

  } catch (error) {
    console.error("Sales Data Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};