import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: [],
  });
  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.log(error);
       toast.error("Failed to fetch sales data");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 md:ml-[240px] lg:ml-[280px] mt-20 md:mt-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {/* Stats card */}
          <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base md:text-lg">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg sm:text-xl md:text-2xl font-bold">
              {stats.totalUsers}
            </CardContent>
          </Card>

          <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base md:text-lg">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg sm:text-xl md:text-2xl font-bold">
              {stats.totalProducts}
            </CardContent>
          </Card>

          <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base md:text-lg">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg sm:text-xl md:text-2xl font-bold">
              {stats.totalOrders}
            </CardContent>
          </Card>

          <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base md:text-lg">
                Total Sales
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg sm:text-xl md:text-2xl font-bold">
              ₹{stats.totalSales?.toFixed(2)}
            </CardContent>
          </Card>

          {/* Sales chart */}
          <Card className=" col-span-1 sm:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle>Sales (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.sales}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#F472B6"
                    fill="#F472B6"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSales;
