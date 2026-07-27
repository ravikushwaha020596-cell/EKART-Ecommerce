import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/orders/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading all orders...
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-gray-100 
     px-2 sm:px-3 md:px-4  py-2 sm:py-6 md:ml-[240px]
      lg:ml-[280px] md:w-[calc(100%-240px)] 
      lg:w-[calc(100%-280px)] mt-12"
    >
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 mt-12 sm:mt-0">
        Admin - All Orders
      </h1>

      {orders.length === 0 ? (
        <h1 className="text-gray-500">No orders found</h1>
      ) : (
        <>
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow border p-4"
              >
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500">
                    Order ID
                  </p>

                  <p className="break-all text-sm">{order._id}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500">User</p>

                  <p className="font-medium">{order.user?.name}</p>

                  <p className="text-xs break-all text-gray-500">
                    {order.user?.email}
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500">
                    Products
                  </p>

                  {order.products.map((p, idx) => (
                    <p key={idx}>
                      • {p.productName} × {p.quantity}
                    </p>
                  ))}
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Amount</span>

                  <span className="font-semibold">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Status</span>

                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Date</span>

                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block w-full overflow-x-auto bg-white rounded-lg">
            <table className="w-full border border-gray-200 text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">User</th>
                  <th className="px-4 py-2 border">Products</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border break-all">{order._id}</td>

                    <td className="px-4 py-2 border">
                      {order.user?.name}
                      <br />
                      <span className="text-xs text-gray-500 break-all">
                        {order.user?.email}
                      </span>
                    </td>

                    <td className="px-4 py-2 border">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="text-sm">
                          {p.productName} × {p.quantity}
                        </div>
                      ))}
                    </td>

                    <td className="px-4 py-2 border font-semibold whitespace-nowrap">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-2 border whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-4 py-2 border whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
