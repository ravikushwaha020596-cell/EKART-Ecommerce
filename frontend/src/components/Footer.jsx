import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo + Info */}
        <div>
          <Link to="/">
            <img src="/Ekart.png" alt="" className="w-28 sm:w-32" />
          </Link>

          <p className="mt-2 text-sm">
            Powering Your World With the Best in Electronics.
          </p>

          <p className="mt-2 text-sm">
            181229 Electronics City-Indore, india
          </p>

          <p className="text-sm break-words">
            Email:support@ekart.com
          </p>
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">Customer</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQS</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3 text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
            <FaPinterest />
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">Stay in the Loop</h3>

          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>

          <form className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-700 text-center text-xs sm:text-sm px-4 pt-4">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-pink-600">Ekart</span>. All rights reserved
        </p>
      </div>

    </footer>
  );
};

export default Footer;