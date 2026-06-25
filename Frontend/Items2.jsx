import React, { useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate} from 'react-router-dom';


function Items2() {
      const [relatedProducts, setRelatedProducts] = useState("");
      const {name} = useParams();
      const navigate = useNavigate();

useEffect (() =>{
        const fetchProduct = async () => {
            const relatedResponse = await axios.get(`http://127.0.0.1:8000/catitems/${name}/`);
            setRelatedProducts(relatedResponse.data);
            console.log(relatedResponse.data)
        };   
        fetchProduct(); },
        [name])


        const nextproduct = (data) =>{
            navigate(`/Itemview/${data}/`)
          
          }
  return (
    <>
       <div className="mt-8 space-y-8 ">
        <h2 className="text-5xl text-center font-bold text-blue-900">{name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg p-4 shadow-md hover:scale-105">
                <img
                  src={`http://localhost:8000${relatedProduct.image}`}
                  alt={relatedProduct.name}
                  className="w-full h-72 object-cover rounded-md"
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
            <p className="text-gray-500">No products found...</p>
          )}
        </div>
      </div>
      </>
  );
}

export default Items2