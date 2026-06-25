import React, { useState, useEffect } from "react";
import axios from 'axios';

const Categorylist = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({
    id: "",
    categoryname: "",
    image: null,
    imagePreview: null, // To store image preview
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/newcategory/0/");
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
console.log(products)

  // Handle Delete Product
  const handleDelete = async (id, name) => {
    const confirm = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirm) {
      const response = await axios.delete(`http://127.0.0.1:8000/newcategory/${id}/`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
        alert(`${name} deleted successfully!`);
      } else {
        alert("Failed to delete the category.");
      }
    }
  };

  // Handle Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProductData({
      id: product.id,
      categoryname: product.categoryname,
      image: null, // load the current image
      imagePreview: product.image, // set image preview to the current image
    });
  };

  // Handle Update Product
  const handleUpdate = async (id) => {
    const updatedProduct = {
      ...editingProduct,
      categoryname: newProductData.categoryname,
      image: newProductData.image, // update the image as well
    };

    const response = await axios.patch(`http://127.0.0.1:8000/newcategory/${id}/`, updatedProduct, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('Category Updated:', response.data);

    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? updatedProduct : product
      )
    );

    setEditingProduct(null); // Close edit mode
  };

  // Handle Image Change (for both editing and adding new product)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductData({
          ...newProductData,
          image: file,
          imagePreview: reader.result, // store preview URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Image Removal
  const handleRemoveImage = () => {
    // Clear the file input
    const fileInput = document.getElementById("image_input");
    if (fileInput) fileInput.value = ""; // This ensures the input field is reset

    // Clear the image preview and file
    setNewProductData({
      ...newProductData,
      image: null,
      imagePreview: null, // clear image preview
    });
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(
    (product) =>
      product.categoryname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const base = "http://localhost:8000";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Category List</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full rounded-md text-sm"
        />
      </div>

      {/* Edit Product Form (appears when editing) */}
      {editingProduct && (
        <div className="bg-gray-100 p-4 mb-6">
          <h2 className="text-lg mb-2">Edit Category</h2>
          <div>
            <label>name:</label>
            <input
              type="text"
              value={newProductData.categoryname}
              onChange={(e) =>
                setNewProductData({ ...newProductData, categoryname: e.target.value })
              }
              className="border p-1 w-full mb-2 text-sm"
            />
          </div>
          {/* Image Upload for Editing */}
          <div>
            <label>Image:</label>
            <div className="mb-2">
              {newProductData.imagePreview ? (
                <>
                  <img
                    src={newProductData.imagePreview}
                    alt="Category"
                    className="w-20 h-20 object-cover mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white text-xs py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <p>No image selected</p>
              )}
              <input
                type="file"
                id="image_input" // Add an id for file input
                accept="image/*"
                onChange={handleImageChange}
                className="border p-1 text-sm"
              />
            </div>
          </div>

          <button
            onClick={() => handleUpdate(newProductData.id)}
            className="bg-blue-500 text-white py-1 px-3 text-xs rounded"
          >
            Update
          </button>
          <button
            onClick={() => setEditingProduct(null)}
            className="bg-gray-500 text-white py-1 px-3 text-xs rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Display Product List in Table Format */}
      <table className="table-auto border w-[60%] border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">category name</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-2 py-1">
                  <img
                    src={base + product.image}
                    alt={product.categoryname}
                    className="w-5 h-5 "
                  />
                </td>
                <td className="border px-2 py-1 text-xs">{product.categoryname}</td>
                <td className="border  px-2 py-1">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 text-gray-700 py-1 px-2 text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.categoryname)}
                    className="bg-red-500 text-white py-1 px-2 text-xs rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-2 text-xs">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categorylist;
