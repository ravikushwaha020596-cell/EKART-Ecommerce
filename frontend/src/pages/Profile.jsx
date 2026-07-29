import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";
import { Eye, EyeOff } from "lucide-react"; 

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });

  const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile), //preview only
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      //use FormData for text + file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);
      if (file) {
        formData.append("file", file); //image file or backend multer
      }
      const res = await axios.put(
  `${import.meta.env.VITE_URL}/api/v1/user/update/${userId}`,
  formData,
  {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };


    const handlePasswordInput = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.put(
  `${import.meta.env.VITE_URL}/api/v1/user/change-password`,
  passwordData,
  {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error("Password update failed");
    }
  };


  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList className="justify-center w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center bg-gray-100">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">
                Upadate Profile
              </h1>
              <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6 max-w-2xl mx-auto">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilePic || userLogo}
                    alt="profile"
                     className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-800" 
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-l hover:bg-pink-700">
                    Change Picture
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                {/* profile form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-x-4 shadow-lg p-5 rounded-lg bg-white"
                >
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="firstName"
                        className="block text-sm font-medium"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Ravi"
                        value={updateUser.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lastName"
                        className="block text-sm font-medium"
                      >
                        Last Name
                      </Label>
                      <Input
                        
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Kumar"
                        value={updateUser.lastName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email
                    </Label>
                    <Input
                     
                      type="email"
                      id="email"
                      name="email"
                      disabled
                      value={updateUser.email}
                      onChange={handleChange}
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phoneNo"
                      className="block text-sm font-medium"
                    >
                      Phone Number
                    </Label>
                    <Input
                      
                      type="text"
                      id="phoneNo"
                      name="phoneNo"
                      value={updateUser.phoneNo}
                      onChange={handleChange}
                      placeholder="Enter your Contact No"
                      className="w-full border rounded-lg px-3 mt-1 "
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="address"
                      className="block text-sm font-medium"
                    >
                      Address
                    </Label>
                    <Input
                     
                      type="text"
                      id="address"
                      name="address"
                      value={updateUser.address}
                      onChange={handleChange}
                      placeholder="Enter your Address"
                      className="w-full border rounded-lg px-3 mt-1 "
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="city"
                        className="block text-sm font-medium"
                      >
                        City
                      </Label>
                      <Input
                       
                        type="text"
                        id="city"
                        name="city"
                        value={updateUser.city}
                        onChange={handleChange}
                        placeholder="Enter your City"
                        className="w-full border rounded-lg px-3 mt-1 "
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="zipCode"
                        className="block text-sm font-medium"
                      >
                        Zip code
                      </Label>
                      <Input
                       
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={updateUser.zipCode}
                        onChange={handleChange}
                        placeholder="Enter your Zipcode"
                        className="w-full border rounded-lg px-3 mt-1 "
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg"
                  >
                    Update Profile
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>

         <TabsContent value="orders">
        <div  className="grid place-items-start justify-items-center min-h-[60vh]">
          <MyOrder />
        </div>
        </TabsContent>




        <TabsContent value="password">
          <div className="flex justify-center items-center min-h-[60vh]">
            <form
              onSubmit={handlePasswordChange}
              className="bg-white w-[90%] max-w-[320px] sm:max-w-md p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Change Password
              </h2>
               {["old", "new", "confirm"].map((type) => {
                const field =
                  type === "old"
                    ? "oldPassword"
                    : type === "new"
                    ? "newPassword"
                    : "confirmPassword";

                return (
                  <div key={type} className="relative mb-4">

                    <Input
                      type={showPassword[type] ? "text" : "password"}
                      name={field}
                      value={passwordData[field]}
                      onChange={handlePasswordInput}
                      placeholder={field}
                      autoComplete={
                        type === "old"
                          ? "current-password"
                          : "new-password"
                      }
                    />

                    {showPassword[type] ? (
                      <EyeOff
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            [type]: false,
                          })
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      />
                    ) : (
                      <Eye
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            [type]: true,
                          })
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      />
                    )}
                  </div>
                );
              })}

              <Button className="w-full mt-3 bg-pink-600 hover:bg-pink-700">
                Update Password
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
