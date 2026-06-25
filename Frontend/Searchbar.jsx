import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // New
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/items/0/");
        const itemlist = response.data.map(item => item.name);
        setProducts(itemlist);

        const catresponse = await axios.get("http://127.0.0.1:8000/product/")
        const catlist = catresponse.data.map(items=> items.categoryname);
        setProducts(previtems => [...new Set([...previtems,...catlist])])

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = products.filter(product =>
        product.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setActiveSuggestionIndex(-1); // Reset active index when typing
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      // Move down
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      // Move up
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && suggestions.length > 0) {
        setSearchQuery(suggestions[activeSuggestionIndex]);
      }
      navigate(`/Itemview/${suggestions[activeSuggestionIndex]}/`)
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/Itemview/${suggestion}/`)
    setSuggestions([]);
  };

  return (
    <>
      <div className="relative ml-[35%] mt-3 w-1/3">
        <input
          type="text"
          placeholder="Search your product"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Changed from onKeyPress
          className="p-3 pr-12 rounded-3xl w-full bg-[#EAE2C6] text-[#3E5879] focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
        />
        <AiOutlineSearch
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#577BC1]"
          size={30}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-2 w-1/3 mx-auto bg-white shadow-lg rounded-lg max-h-60 overflow-auto">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer ${
                  index === activeSuggestionIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Searchbar;
