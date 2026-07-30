import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
  Menu,
} from "lucide-react";
import { FaRegEdit } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `text-base ${
      isActive ? "bg-pink-600 text-white" : "bg-transparent"
    } flex items-center gap-2 font-semibold cursor-pointer p-3 rounded-lg w-full`;

  return (
    <>
      {/* 🔹 HAMBURGER BUTTON (Mobile) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-16 left-2 z-50 bg-pink-500 text-white p-2 rounded shadow"
      >
        <Menu size={20} />
      </button>

      {/* 🔹 MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-50 flex w-full overflow-hidden">
          
          {/* LEFT SIDEBAR */}
          <div className="w-[220px] max-w-[80%] bg-pink-50 h-full p-4 space-y-2 overflow-y-auto">
            
            <button
              onClick={() => setOpen(false)}
              className="mb-4 text-right w-full text-lg"
            >
              ❌
            </button>

            <NavLink to="/dashboard/sales" className={navClass} onClick={() => setOpen(false)}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/dashboard/add-product" className={navClass} onClick={() => setOpen(false)}>
              <PackagePlus size={18} />
              Add Product
            </NavLink>

            <NavLink to="/dashboard/product" className={navClass} onClick={() => setOpen(false)}>
              <PackageSearch size={18} />
              Products
            </NavLink>

            <NavLink to="/dashboard/users" className={navClass} onClick={() => setOpen(false)}>
              <Users size={18} />
              Users
            </NavLink>

            <NavLink to="/dashboard/orders" className={navClass} onClick={() => setOpen(false)}>
              <FaRegEdit />
              Orders
            </NavLink>
          </div>

          {/* RIGHT SIDE OVERLAY */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}

      {/* 🔹 DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed border-r bg-pink-50 border-pink-200 w-[240px] lg:w-[280px] p-6 space-y-2 h-screen overflow-y-auto">
        <div className="pt-10 space-y-2">
          
          <NavLink to="/dashboard/sales" className={navClass}>
            <LayoutDashboard />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/add-product" className={navClass}>
            <PackagePlus />
            Add Product
          </NavLink>

          <NavLink to="/dashboard/product" className={navClass}>
            <PackageSearch />
            Products
          </NavLink>

          <NavLink to="/dashboard/users" className={navClass}>
            <Users />
            Users
          </NavLink>

          <NavLink to="/dashboard/orders" className={navClass}>
            <FaRegEdit />
            Orders
          </NavLink>

        </div>
      </div>
    </>
  );
};

export default Sidebar;