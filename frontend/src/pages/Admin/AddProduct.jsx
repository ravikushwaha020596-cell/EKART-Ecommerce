import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {products} = useSelector(store=>store.products)
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImage: [],
    brand: "",
    category: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);
    if (productData.productImage.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    productData.productImage.forEach((image) => {
      if (image instanceof File){
      formData.append("files", image);
      }
    });
    try {
      setLoading(true);
      const res = await axios.post(
  `${import.meta.env.VITE_URL}/api/v1/product/add`,
  formData,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);
         navigate("/dashboard/product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product add failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen
        bg-gray-100

        px-2
        sm:px-4
        md:px-6

        py-4
        sm:py-6
        md:py-8

        md:pl-[300px]
        md:pr-6
        mt-5
      ">
      <Card className="w-full my-20">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter Product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                placeholder="Ex-Iphone"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={productData.productPrice}
                onChange={handleChange}
                name="productPrice"
                placeholder=""
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Brand</Label>
                <Input
                  type="text"
                  value={productData.brand}
                  onChange={handleChange}
                  name="brand"
                  placeholder="Ex-apple"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  type="text"
                  value={productData.category}
                  onChange={handleChange}
                  name="category"
                  placeholder="Ex-mobile"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Description</Label>
              </div>
              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                placeholder="Enter brief description of product"
              />
            </div>
            <ImageUpload
              productData={productData}
              setProductData={setProductData}
            />
          </div>
          <CardFooter className="p-0 w-full block">
            <Button
              disabled={loading}
              onClick={submitHandler}
              className="w-full mt-6 bg-pink-600 cursor-pointer"
              type="submit"
            >
              {loading ? (
                <span className="flex gap-1 items-center">
                  <Loader2 className="animate-spin" /> Please wait
                </span>
              ) : (
                "Add product"
              )}
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
