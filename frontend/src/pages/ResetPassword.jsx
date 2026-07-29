import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔹 Email from query parameter
  const email = searchParams.get("email") || "";

  // 🔹 Redirect if email missing
  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please verify OTP first.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
  `${import.meta.env.VITE_URL}/api/v1/user/change-password/${email}`,
  { newPassword: password, confirmPassword: password }
);
    if (res.data.success) {
      toast.success("Password reset successfully!");
      navigate("/login");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to reset password");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center mb-4">Set New Password</h2>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(false)}
              className="w-5 h-5 text-gray-700 absolute right-4 top-2.5 cursor-pointer"
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(true)}
              className="w-5 h-5 text-gray-700 absolute right-4 top-2.5 cursor-pointer"
            />
          )}
        </div>
        <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;