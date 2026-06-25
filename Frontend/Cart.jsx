import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userid = 7
  const navigate = useNavigate();
  


  useEffect(() =>{
   const fetchitem = async () => {
    try{
     const response = await axios.get(`http://127.0.0.1:8000/cartitems/${userid}/`)
          setCartItems(response.data)
    } catch(error) {
        console.error('Error fetching products:', error);
      }
    }
  fetchitem()
  }, [userid])


  const updateQuantity =  (id, quantity) => {
    if(quantity>=1){   
          setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );   
  const response =  axios.patch(`http://127.0.0.1:8000/updatecart/${id}/${quantity}/`)
    };
  };

  const removeItem = (id) => {
    const response =  axios.delete(`http://127.0.0.1:8000/addcart/${id}/`)
    setCartItems(prev => prev.filter(item => item.id !== id));
    alert('item removed from cart')
  };
  const openproduct = (item) =>{
    navigate(`/Itemview/${item}/`)
  } 

  const total = cartItems.reduce((sum, item) => sum + item.product_id.price * item.quantity, 0);
  const charge = 0
  const granttotal = total + charge
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white shadow rounded">
                <button><img 
                onClick={() => openproduct(item.product_id.name)}
                src={`http://localhost:8000${item.product_id.image}`} alt={item.product_id.name} className="w-20 h-20 object-cover rounded" /></button>
                <div className="flex-1">
                  <button><h2 
                  onClick={() => openproduct(item.product_id.name)}
                  className="font-semibold text-lg">{item.product_id.name}</h2></button>
                  <p className="text-gray-500">₹{Number(item.product_id.price).toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity -1)}
                      className="px-2 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id ,item.quantity +1)}
                      className="px-2 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                ₹{(item.product_id.price * item.quantity).toFixed(2)}
                  <p className="text-xl font-semibold">
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>{charge == 0 ? 'Free':charge}</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>₹{granttotal}</span>
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
