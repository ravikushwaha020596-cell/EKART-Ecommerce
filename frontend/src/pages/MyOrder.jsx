import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyOrder = () => {
  const [userOrder, setUserOder] = useState([]);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
     try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("Orders API response:", res.data);
    if (res.data.success) {
      setUserOder(res.data.orders);
    }
  }
  catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to fetch orders");
  }
};
  useEffect(() => {
    getUserOrders();
  }, []);


  return (
   <>
   <OrderCard userOrder={userOrder}/>
   </>
  );
};

export default MyOrder;
