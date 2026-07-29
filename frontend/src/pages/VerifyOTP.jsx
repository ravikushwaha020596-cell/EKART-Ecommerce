import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Get email from URL
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Start forgot password again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  if (!email) return null; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending OTP:", { email, otp });

    try {
     const res = await axios.post(
  `${import.meta.env.VITE_URL}/api/v1/user/verify-otp/${encodeURIComponent(email)}`,
  { otp }
);
      console.log("OTP Response:", res.data);

      if (res.data.success) {
        toast.success("OTP verified!");
        navigate(`/reset-password?email=${email}`);
      }
    } catch (err) {
      console.log("OTP Error:", err.response);
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center mb-4">Verify OTP</h2>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
          Verify OTP
        </Button>
      </form>
    </div>
  );
};

export default VerifyOTP;