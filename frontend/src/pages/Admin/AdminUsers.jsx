import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserLogo from "../../assets/user.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
  `${import.meta.env.VITE_URL}/api/v1/user/all-user`,
  {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 ml-0 md:ml-60 lg:ml-70 mt-20 md:mt-12"
    >
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
        User Management
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        {" "}
        View and manage registered users
      </p>

      <div className="relative w-full sm:w-[300px] mt-6">
        <Search className="absolute left-3 top-2.5 text-gray-600 sm:w-5" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Users..."
          className="pl-9 sm:pl-10 text-sm sm:text-base"
        />
      </div>

      <div className=" grid gap-4 sm:gap-6 mt-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
        {filteredUsers.map((user, index) => {
          return (
            <div
              key={index}
              className="bg-pink-100 p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.profilePic || UserLogo}
                  alt=""
                  className="rounded-full w-16 aspect-square object-cover border border-pink-600"
                />
                <div className="flex flex-col min-w-0">
                  <h1 className="font-semibold text-sm sm:text-base truncate">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <h3 className="text-xs sm:text-sm text-gray-600 break-all">
                    {user?.email}
                  </h3>
                </div>
              </div>
              <div className=" flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <Button
                  onClick={() => navigate(`/dashboard/users/${user?._id}`)}
                  variant="outline"
                >
                  <Edit />
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/dashboard/users/orders/${user?._id}`)
                  }
                  className=" bg-pink-600 text-sm sm:text-base"
                >
                  <Eye />
                  Show Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdminUsers;
