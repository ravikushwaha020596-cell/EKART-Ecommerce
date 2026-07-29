import { ShoppingCart, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.products);

  const [open, setOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/logout`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-pink-50 z-50 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4">
        {/* Logo */}
        <img src="/Ekart.png" alt="logo" className="w-24" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-6 items-center text-lg font-semibold">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/products">
              <li>Product</li>
            </Link>

            {user && (
              <Link to={`/profile/${user._id}`}>
                <li>Hello, {user.firstName}</li>
              </Link>
            )}

            {admin && (
              <Link to={`/dashboard/sales`}>
                <li>Dashboard</li>
              </Link>
            )}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-4 px-2 text-sm">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {user ? (
            <Button onClick={logoutHandler} className="bg-pink-600 text-white">
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-l from-blue-600 to-purple-600 text-white"
            >
              Login
            </Button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setOpen(false)}>
            Product
          </Link>

          {user && (
            <Link to={`/profile/${user._id}`} onClick={() => setOpen(false)}>
              Hello, {user.firstName}
            </Link>
          )}

          {admin && (
            <Link to={`/dashboard/sales`} onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}

          <Link to="/cart" onClick={() => setOpen(false)}>
            Cart ({cart?.items?.length || 0})
          </Link>

          {user ? (
            <Button onClick={logoutHandler} className="bg-pink-600 text-white">
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-l from-blue-600 to-purple-600 text-white"
            >
              Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
