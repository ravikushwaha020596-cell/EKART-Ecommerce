import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import userLogo from "../assets/user.jpg";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useSelector((store) => store.products);
  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API = "http://localhost:8000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const loadCard = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.carts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCard();
  }, [dispatch]);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen px-2 sm:px-4">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-7">
            Shopping Cart
          </h1>

          <div className="flex flex-col lg:flex-row gap-5 sm:gap-7">
            
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-4 sm:gap-5 flex-1">
              {cart.items.map((product, index) => (
                <Card key={index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-3 sm:pr-7">
                    
                    {/* IMAGE + NAME */}
                    <div className="flex items-center gap-3 w-full sm:w-[350px]">
                      <img
                        src={product?.productId?.productImage?.[0]?.URL || userLogo}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                      />
                      <div className="w-full">
                        <h1 className="font-semibold text-sm sm:text-base line-clamp-2">
                          {product?.productId?.productName}
                        </h1>
                        <p className="text-sm">
                          ₹{product?.productId?.productPrice}
                        </p>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex gap-3 items-center justify-between sm:justify-start">
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(product.productId._id, "decrease")
                        }
                        variant="outline"
                      >
                        -
                      </Button>
                      <span>{product.quantity}</span>
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(product.productId._id, "increase")
                        }
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>

                    {/* PRICE + REMOVE */}
                    <div className="flex justify-between sm:block w-full sm:w-auto">
                      <p className="font-medium">
                        ₹{product?.productId?.productPrice * product?.quantity}
                      </p>
                      <p
                        onClick={() => handleRemove(product?.productId?._id)}
                        className="flex text-red-500 items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-[400px]">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart?.items?.length} items)</span>
                    <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex space-x-2">
                      <Input placeholder="promo code" />
                      <Button variant="outline">Apply</Button>
                    </div>

                    <Button
                      onClick={() => navigate("/address")}
                      className="w-full bg-pink-600 text-sm sm:text-base"
                    >
                      PLACE ORDER
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground pt-4">
                    <p>* Free Shipping on orders over 299</p>
                    <p>* 30-Days Return Policy</p>
                    <p>* Secure checkout with SSL encryption</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="bg-pink-100 p-6 rounded-full">
            <ShoppingCart className="w-16 h-16 text-pink-600" />
          </div>

          <h2 className="mt-6 text-xl sm:text-2xl font-bold text-gray-800">
            Your cart is Empty
          </h2>

          <p className="mt-2 text-gray-600">
            Looks like you haven't added anything yet
          </p>

          <Button
            onClick={() => navigate("/products")}
            className="mt-6 bg-pink-600 text-white"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;