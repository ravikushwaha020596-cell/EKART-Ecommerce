import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gray-100

      px-3 sm:px-4 md:px-6 lg:px-8
      py-6 sm:py-8 md:py-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>

        {userOrder?.length === 0 ? (
          <p className="text-gray-800 space-y-6 text-center text-lg">
            No Orders found for this user
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="shadow-lg rounded-2xl p-5 border border-gray-200 w-full bg-white"
              >
                {/* Order header */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
                  <h2 className="text-lg font-semibold break-all">
                    Order Id: <span className="text-gray-600">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Amount:{" "}
                    <span className="font-bold">
                      {order.currency} {order.amount.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* User info + status */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">User:</span>{" "}
                      {order.user?.firstName || "Unknown"}{" "}
                      {order.user?.lastName || ""}
                    </p>
                    <p className="text-sm text-gray-500">
                      Email: {order.user?.email || "N/A"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block shadow-sm ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-medium mb-2">Products:</h3>
                  <ul className="flex flex-col gap-2">
                    {order.products.map((product, index) => {
                      const prod = product?.productId;
                      return (
                        <li
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-50 rounded-lg p-2"
                        >
                          <img
                            onClick={() =>
                              prod?._id && navigate(`/products/${prod._id}`)
                            }
                            className="w-20 object-cover rounded cursor-pointer"
                            src={
                              prod?.productImage?.[0]?.URL || "/placeholder.png"
                            }
                            alt={prod?.productName || "Deleted Product"}
                          />
                          <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 w-full">
                            <span className="line-clamp-2 text-sm">
                              {prod?.productName || "Deleted Product"}
                            </span>
                            <span className="font-medium">
                              ₹{prod?.productPrice || 0} x{" "}
                              {product.quantity || 0}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
``;
