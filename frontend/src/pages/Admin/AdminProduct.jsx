import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setProducts } from "@/redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.products);
  const [editProducts, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  }
  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((preview) => ({
      ...preview,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", editProducts.productName);
    formData.append("productDesc", editProducts.productDesc);
    formData.append("productPrice", editProducts.productPrice);
    formData.append("category", editProducts.category);
    formData.append("brand", editProducts.brand);

    // Add existing images public_ids
    const exisitingImage = editProducts.productImage
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(exisitingImage));

    //  Add new files
    editProducts.productImage
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
  `${import.meta.env.VITE_URL}/api/v1/product/update/${editProducts._id}`,
  formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product update Successfully");
        const updateProducts = products.map((p) =>
          p._id === editProducts._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (products) => products._id !== productId,
      );
      const res = await axios.delete(
  `${import.meta.env.VITE_URL}/api/v1/product/delete/${productId}`,
  {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 overflow-x-hidden
      px-2 sm:px-3 md:px-6   
      py-4 sm:py-6 md:py-8
      md:pl-[260px] lg:pl-[300px]  
      flex flex-col gap-4 mt-12"
    >
      <div
        className="flex flex-row gap-2 sm:gap-4 justify-between items-center mt-12 sm:mt-0"
      >
        <div className="relative bg-white rounded-lg w-full sm:w-[250px] md:w-[300px] lg:w-[400px]">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product ..."
            className="w-full text-base pr-7"
          />
          <Search
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"
          />
        </div>
      
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.map((product, index) => {
        return (
          <Card key={product._id} className="p-3 sm:p-4">
            <div
              className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
            >
              <div
                className="flex
                    gap-3
                    items-center"
              >
                <img
                  src={product?.productImage?.[0]?.URL}
                  alt=""
                  className="w-24 h-24"
                />
                <h1
                  className="font-bold text-gray-700 break-words max-w-[200px] sm:max-w-[250px] md:max-w-[350px]"
                >
                  {product.productName}
                </h1>
              </div>
              <h1 className="font-semibold text-gray-800">
                ₹{product.productPrice}
              </h1>
              <div className="flex gap-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Edit
                      onClick={() => {
                        (setOpen(true), setEditProduct(product));
                      }}
                      className="text-green-500 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Make changes to your Product here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                      <div className="grid gap-2">
                        <Label>Product Name</Label>
                        <Input
                          type="text"
                          value={editProducts?.productName}
                          onChange={handleChange}
                          name="productName"
                          placeholder="EX-Iphone"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={editProducts?.productPrice}
                          onChange={handleChange}
                          name="productPrice"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Brand</Label>
                          <Input
                            type="text"
                            value={editProducts?.brand}
                            onChange={handleChange}
                            name="brand"
                            placeholder="EX-apple"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Category</Label>
                          <Input
                            type="text"
                            value={editProducts?.category}
                            onChange={handleChange}
                            name="category"
                            placeholder="EX-mobile"
                            required
                          />
                        </div>
                      </div>
                      <div className=" grid gap-2">
                        <div className="flex items-center">
                          <Label>Description</Label>
                        </div>
                        <Textarea
                          name="productDesc"
                          value={editProducts?.productDesc}
                          onChange={handleChange}
                          placeholder="Enter brief description of product"
                        />
                      </div>
                      <ImageUpload
                        productData={editProducts}
                        setProductData={setEditProduct}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="text-red-500 cursor-pointer" />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. 
                        This will permanently delete this product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => DeleteProductHandler(product._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminProduct;
