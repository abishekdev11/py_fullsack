import React, { useEffect, useState } from "react";
import axios from "axios";

const Deliverydashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
   const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fetchorders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  fetchOrders();
},[])
  
  const markAsDelivered = async (orderId) => {
    try {
      await axios.patch(`http://localhost:8000/delivery/${orderId}/`);
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: "delivered" } : order
        )
      );
    } catch (err) {
      console.error("Failed to mark as delivered:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Delivery Dashboard</h1>
          <p className="text-gray-600">Logged in as: <span className="font-semibold">Delivery Employee</span></p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No orders assigned.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.name}</td>
                    <td className="px-4 py-3">{order.address}</td>
                    <td className="px-4 py-3">{order.mobile}</td>
                    <td className="px-4 py-3">{order.product_id}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {order.status !== "delivered" && (
                        <button
                          onClick={() => markAsDelivered(order.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                          Mark as Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Deliverydashboard;
