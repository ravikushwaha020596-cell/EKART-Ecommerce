import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";


const MyOrder = () => {
  const [userOrder, setUserOder] = useState([]);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
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
