import React from "react";
import { Button } from "./ui/button";
import {useNavigate} from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-snug">
              Latest Electronics at Best Prices
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-blue-100">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops and more
            </p>

            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-white text-blue-600 hover:bg-gray-200 w-auto"
                onClick={()=>navigate("/products")}>
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent w-auto"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/ekart-hero.png"
              alt="hero"
              className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg shadow-2xl mt-8 md:mt-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
