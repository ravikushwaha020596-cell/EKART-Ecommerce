import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ShowUserOrders = () => {
  const params = useParams();

  const [userOrder, setUserOrder] = useState([]);
  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/orders/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (res.data.success) {
      setUserOrder(res.data.orders);
    }
  }
  catch (error) {
    console.error("Failed to fetch user orders:", error);
    toast.error(error.response?.data?.message || "Failed to fetch user orders");
  }
};
  useEffect(() => {
    getUserOrders();
  }, [params.userId]);

  return (
    <>
      <OrderCard
  userOrder={userOrder}
  withSidebar={true}
/>
    </>
  );
  };

export default ShowUserOrders;
