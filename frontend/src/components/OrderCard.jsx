import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder, withSidebar = true }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
    min-h-screen
    bg-gray-100
    px-2
    sm:px-4
    md:px-6
    py-15
    sm:py-6
    md:py-8
    ${withSidebar ? "md:pl-[300px] md:pr-6 mt-15" : ""}
  `}
    >
      <div className="w-full">
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
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
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
                    className={`inline-flex w-fit items-center justify-center
                   px-2 py-1
                    text-[11px] sm:text-xs
                    rounded-full
                     font-medium
                       whitespace-nowrap
                      ${
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
                          className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 rounded-lg p-3"
                        >
                          <img
                            onClick={() =>
                              prod?._id && navigate(`/products/${prod._id}`)
                            }
                              className="w-full h-40 sm:h-32 md:h-20 md:w-20 object-contain rounded-lg cursor-pointer shrink-0 bg-white"
                            src={
                              prod?.productImage?.[0]?.URL || "/placeholder.png"
                            }
                            alt={prod?.productName || "Deleted Product"}
                          />
                          <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-2 w-full">
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
