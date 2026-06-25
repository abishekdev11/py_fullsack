import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Category() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const base = "http://localhost:8000";

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("http://127.0.0.1:8000/product/");
        setItems(response.data);
    };
    fetchData();
  }, []);

  // Filter items based on search query
  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.categoryname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;
    const navitem = (data) =>{
      navigate(`/Items2/${data}/`)
    }

  return (
    <>
      <h1 className="mb-2 mt-10 ml-12 text-5xl font-bold leading-tight text-primary">
        Search by Category:
      </h1>

      <div className="max-w-6xl bg-blue-800 border-4 border-amber-200 mx-auto p-6">
        {/* Search Input */}
        <div className="flex flex-none sm:flex-row justify-between mb-6 gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a category"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-2/3"
          />
        </div>

        {/* Display Filtered Items */}
        <div className="grid grid-cols-4 gap-6 pb-4 h-80 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center text-lg text-gray-800 col-span-4">No items found</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-[#EAE2C6]  p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={()=> navitem(item.categoryname)}>
                <img
                  src={base + item.image}
                  alt={item.categoryname}
                  className="w-full h-60 object-cover rounded-md mb-2"
                />
                <h3 className="text-center text-lg font-semibold">{item.categoryname}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Category;
