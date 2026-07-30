import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/user.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {useDispatch} from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";




const UserInfo = () => {
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState(null);
  const [file, setFile] = useState(null);
//   const { user } = useSelector((store) => store.user);
 const dispatch = useDispatch()
  const params = useParams();
  const userId = params.id;
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

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
  `${import.meta.env.VITE_URL}/api/v1/user/get-user/${userId}`,
);
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch user orders");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [userId]);

  return (
    <div className=" min-h-screen bg-gray-100

  px-3 sm:px-4 md:px-6
  py-6 sm:py-8 md:py-10

  ml-0
  md:ml-[240px]
lg:ml-[280px]

  mt-10 md:mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="flex justify-center gap-10 mt-10">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>
          </div>
          <div className="w-full flex flex-col items-center gap-6 px-4 max-w-2xl">
            {/* profile picture */}
            <div className="flex flex-col items-center">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name
                  </Label>
                  <Input
                    // id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Ravi"
                    value={updateUser?.firstName}
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
                    // id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Kumar"
                    value={updateUser?.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  Email
                </Label>
                <Input
                  //   id="email"
                  type="email"
                  name="email"
                  disabled
                  value={updateUser?.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 mt-1 bg-gray-100 cursuor-not-allowed"
                />
              </div>

              <div>
                <Label htmlFor="phoneNo" className="block text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  //   id="phoneNo"
                  type="text"
                  name="phoneNo"
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter your Contact No"
                  className="w-full border rounded-lg px-3 mt-1 "
                />
              </div>

              <div>
                <Label htmlFor="address" className="block text-sm font-medium">
                  Address
                </Label>
                <Input
                  //   id="address"
                  type="text"
                  name="address"
                  value={updateUser?.address}
                  onChange={handleChange}
                  placeholder="Enter your Address"
                  className="w-full border rounded-lg px-3 mt-1 "
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="block text-sm font-medium">
                    City
                  </Label>
                  <Input
                    // id="city"
                    type="text"
                    name="city"
                    value={updateUser?.city}
                    onChange={handleChange}
                    placeholder="Enter your City"
                    className="w-full border rounded-lg px-3 mt-1 "
                  />
                </div>
                <div>
                  <Label
                    htmlFor="zipcode"
                    className="block text-sm font-medium"
                  >
                    Zip code
                  </Label>
                  <Input
                    // id="zipcode"
                    type="text"
                    name="zipCode"
                    value={updateUser?.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your Zipcode"
                    className="w-full border rounded-lg px-3 mt-1 "
                  />
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Label className="block text-sm font-medium">Role :</Label>
                <RadioGroup value={updateUser?.role}
                onValueChange={(value)=>setUpdateUser({...updateUser, role:value})}
                 className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
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
    </div>
  );
};

export default UserInfo;
