import { useState, useEffect, } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const Itemview = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchProduct = async () => {
     

        const response = await axios.get(`http://127.0.0.1:8000/itemview/${name}/`);
        setProduct(response.data);
    
        // Fetch related products based on the category or tags (Example: fetch products from the same category)
       if(response.data.length == undefined){
        const relatedResponse = await axios.get(`http://127.0.0.1:8000/itemview2/${response.data.category}/`);
        setRelatedProducts(relatedResponse.data);
       }
       else{
        const relatedResponse = await axios.get(`http://127.0.0.1:8000/itemview2/${name}/`);
        setRelatedProducts(relatedResponse.data);
       }
        // Fetch reviews for the product
        const reviewResponse = await axios.get(`http://127.0.0.1:8000/itemview/${name}/`);
        setReviews(reviewResponse.data);
    };

    fetchProduct();
  }, [name]);

  const addcart = async () => {
    const response = await axios.post(`http://127.0.0.1:8000/addcart/0/`,
      {
       user_id: 6,
       product_id: product.id
      }
    );
    alert(response.data)
  };

  if (!product) {
    return <div className="loading-state">Loading...</div>;
  }
  const rate = product.offer ? product.price - ((product.price / 100) * product.offer) : null;
 
  const nextproduct = (data) =>{
  navigate(`/Itemview/${data}/`)
}
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className= {`${product.length>1 ? 'hidden':''}`}>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="w-full h-auto max-w-md object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center space-x-6">
            <div className="text-3xl font-semibold text-gray-800">
              {product.offer ? <s>₹{product.price}</s> : `₹${product.price}`}
            </div>
            {product.offer && (
              <div className="text-3xl text-red-600 font-bold">
                ₹ {rate}
              </div>
            )}
          </div>

          {/* Offer Badge */}
          {product.offer && (
            <div className="bg-red-600 text-white text-sm px-3 py-1 rounded-full w-fit">
              <span>{product.offer}% OFF</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105"
          onClick={addcart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">Product Details</h2>
        <div>
          <h3 className="font-medium text-xl text-gray-700">Description</h3>
          <p className="text-lg text-gray-600">{product.Description || "Not Available"}</p>
        </div>

        <div>
          <h3 className="font-medium text-xl text-gray-700">Available Quantity</h3>
          <p className="text-lg text-gray-600">{product.quantity || "Not Available"}</p>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">Customer Reviews</h2>
        {reviews.length >= 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <h3 className="font-medium text-xl text-gray-700">{review.username}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">
                  {/* Render stars or rating */}
                  {'★'.repeat(review.rating)}
                </span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
      </div>
      {/* Related Products Section */}
      <div className="mt-16 space-y-8 ">
        <h2 className="text-3xl font-semibold text-gray-800"> {product.length>1 ? name:"Related Products"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg p-4 shadow-md hover:scale-105">
                <img
                  src={`http://localhost:8000${relatedProduct.image}`}
                  alt={relatedProduct.name}
                  className="w-full h-auto object-cover rounded-md"
                />
                <h3 className="text-xl font-medium text-gray-800 mt-4">{relatedProduct.name}</h3>
                <div className="text-lg text-gray-600">
                {relatedProduct.offer ? <s>₹{relatedProduct.price}</s> : `₹${relatedProduct.price}`}
                </div>
                {relatedProduct.offer && (
                  <div className="text-sm text-red-600 font-semibold">
                    ₹{relatedProduct.price - ((relatedProduct.price / 100) * relatedProduct.offer)}
                  </div>
                )}
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600"
                onClick={() => nextproduct(relatedProduct.name)}
                >
                  View Product
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Itemview;
