import React, { useEffect, useState } from "react";
import axios from "axios";

const Orderallocate = () => {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [emp_id, setEmp_id] = useState('None');
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchEmployees();
  }, []);
  const getProducts = async (id) =>{
    const response = await axios.get(`http://127.0.0.1:8000/orderedproduct/${id}/`);
    setProducts(response.data)
  }

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fetchorders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employe/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const assignperson =(emp)=>{
    setEmp_id(emp)
  }


  const assignOrder = async (orderId) => {
    console.log(orderId)
    console.log(emp_id)

    try {
     const response = await axios.post(`http://localhost:8000/orderallocate/${orderId}/${emp_id}/`,);
      fetchOrders(); // Refresh orders
    console.log(response.data)
    } catch (err) {
      console.error("Error assigning order:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Order Management</h1>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.name}</td>
                    <td className="px-4 py-3">{order.address}</td>
                    <td className="px-4 py-3">{order.mobile}</td>
                    <td className="px-7 py-3"><button className="bg-blue-gray-200 px-3 py-3" 
                     onClick={() => {setIsOpen(true); getProducts(order.product_id)}}>
                      {order.product_id}</button>


             {/* dialogue Box */}   
       {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Box */}
          <div
            className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <p>
              <span className="font-medium">Product id:</span> {products.id}
            </p>
            <p>
              <span className="font-medium">Product name:</span> {products.name}
            </p>
                <p>
              <span className="font-medium">Quantity:</span> {products.name}
            </p>
          </div>
        </div>
      )}
    </td>


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
                      <select
                        onChange={(e) => assignperson(e.target.value)}
                        className="border px-2 py-1 rounded"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Employee
                        </option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.emp_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                    <button 
                    onClick={() => assignOrder(order.id)}
                    className="border px-2 py-1 rounded">Assign</button>

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

export default Orderallocate;
