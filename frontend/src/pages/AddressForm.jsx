import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.products,
  );

  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;
const handlePayment = async () => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
      {
        products: cart?.items?.map((items) => ({
          productId: items.productId._id,
          quantity: items.quantity,
        })),
        tax,
        shipping,
        amount: total,
        currency: "INR",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!data.success) {
      return toast.error("Something went wrong");
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "Ekart",

      handler: async function (response) {
        try {
          console.log("Razorpay Response:", response);

          const verifyRes = await axios.post(
            `${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log("Verify Response:", verifyRes.data);

          if (verifyRes.data.success) {
            toast.success("Payment Successful!");
            dispatch(setCart({ items: [], totalPrice: 0 }));
            navigate("/order-success");
          } else {
            toast.error("Payment Verification Failed");
          }
        } catch (err) {
          console.error("VERIFY ERROR:", err.response?.data || err);
          toast.error(
            err.response?.data?.message || "Payment Verification Failed"
          );
        }
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#F472B6",
      },
    };

    if (!window.Razorpay) {
      return toast.error("Razorpay SDK not loaded");
    }

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Payment failed");
  }
};

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-10 py-6 mt-16 md:mt-20">
      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
          {showForm ? (
            <>
              <div>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  name="zip"
                  placeholder="Zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
                <Input
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-pink-600 text-sm sm:text-base w-full"
              >
                Save & Continue
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Saved Addresses</h2>

              {addresses.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`p-4 border rounded-md cursor-pointer relative ${
                    selectedAddress === index
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p>{addr.phone}</p>
                  <p>{addr.email}</p>
                  <p className="text-sm">
                    {addr.address}, {addr.city}, {addr.state}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteAddress(index));
                    }}
                    className="absolute top-2 right-2 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}

              <Button variant="outline" onClick={() => setShowForm(true)}>
                + Add New Address
              </Button>

              <Button
                disabled={selectedAddress === null}
                onClick={handlePayment}
                className="w-full bg-pink-600"
              >
                Process To Checkout
              </Button>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full">
          <Card className="w-full md:w-[350px] lg:w-[400px] mx-auto">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart?.items?.length})</span>
                <span>₹ {subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹ {shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹ {tax}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>

              <div className="text-sm text-gray-500">
                <p>* Free Shipping above ₹299</p>
                <p>* 30 Days Return</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
