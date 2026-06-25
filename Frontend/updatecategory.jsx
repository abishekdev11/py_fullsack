import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Categorylist from './Categorylist';


const updatecategory = () => {
  const [categoryname, setCategoryname] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // for image preview
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        
        };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const datas = {
      categoryname: categoryname,
      image: image,
    }

    const response = await axios.post("http://127.0.0.1:8000/newcategory/0/",  datas,
     { headers: {
      'Content-Type':' multipart/form-data'
      }});

    console.log('New category Added:', response.data);
    alert('category uploaded successfully!');


    setCategoryname('');
    setImage(null);
    setImagePreview(null);
    setLoading(false);
    navigate('/Products');
  };

  const handleClick = () => {
    if (!image) {
      document.getElementById('fileInput').click();
    }
  };

  return (
    <>

    <div className="max-w-4xl mx-auto p-6">
      {/* Product Upload Form */}     
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Category
        </h1>

        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={categoryname}
              onChange={(e) => setCategoryname(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <div
              className="mt-1 block w-full text-sm text-gray-500 border-dashed border-2 border-blue-500 p-4 rounded-md cursor-pointer"
              onClick={handleClick} // Trigger file input on click
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                id="fileInput"
                type="file"
                accept='image/*'
                onChange={handleImageChange}
                className="hidden" // Hidden file input, triggered by the container
              />
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-auto object-cover rounded-md"
                    onClick={handleClick} // Allow clicking the preview to change the image
                  />
                  
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ) : (
                <p>{image ? 'Image selected. Click to change' : 'Drag & Drop or Click to select an image'}</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Categorylist/>
    </>
  );
};

export default updatecategory;
