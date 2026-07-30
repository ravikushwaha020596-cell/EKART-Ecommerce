import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addToCard = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Title */}
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800">
        {product.productName}
      </h1>

      {/* Category + Brand */}
      <p className="text-gray-600 text-sm sm:text-base">
        {product.category} | {product.brand}
      </p>

      {/* Price */}
      <h2 className="text-pink-500 font-bold text-2xl sm:text-3xl">
        ₹{product.productPrice}
      </h2>

      {/* Description */}
      <p className="line-clamp-4 sm:line-clamp-6 md:line-clamp-12 text-sm sm:text-base text-muted-foreground">
        {product.productDesc}
      </p>

      {/* Quantity */}
      <div className="flex items-center gap-3 w-full sm:w-[250px]">
        <p className="text-gray-800 font-semibold text-sm sm:text-base">
          Quantity:
        </p>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {/* Button */}
      <Button
        onClick={() => addToCard(product._id)}
        className="bg-pink-600 w-full sm:w-fit"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
