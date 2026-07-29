import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Submitting email:", email);

    try {
  const res = await axios.post(
    `${import.meta.env.VITE_URL}/api/v1/user/forgot-password`,
    { email }
  );
      console.log("Response:", res.data);

      if (res.data.success) {
        toast.success("OTP sent to your email!");
        // Pass email via query param (safer than state)
        navigate(`/verify-otp?email=${email}`);
      }
    } catch (err) {
      console.log("Error:", err.response);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;