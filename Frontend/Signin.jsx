import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const FormRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username && password){
    try {
      const response = await axios.post("http://127.0.0.1:8000/signin/", {
        username,
        password,
      });
      
        if(response.status==200){
        console.log("Login successful:", response.status);
        console.log("Login successful:", response.data.user_details );

        navigate("/"); 
        }
    }
      catch (error) {
      console.error("Login error:", error);
      alert("invalid username or password")
    }
  }
  else{
    alert("Please fill the mandatory fields")
  }
};


  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] px-5 bg-[url('./public/images/bg.jpeg')] bg-contain">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
      </div>
      <div
        className="xl:max-w-3xl bg-indigo-200 bg-opacity-60 w-full p-5 sm:p-10 rounded-md">
        <h1
          className="text-center text-xl sm:text-3xl font-semibold text-black">
          Signin into your Account
        </h1>
        
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">            
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />            
            <input
              className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100 text-black focus:border-black"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
           <button
  onClick={handleSubmit}
  className="mt-5 ml-44 animate-bounce tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-1/3 py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:shadow-outline focus:outline-none"
>
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
  </svg>

  <span>Signin</span>
</button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              New customer? Create an account{" "}
              <a href="Signup">
                <span className="text-[#E9522C] font-semibold">Signup</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormRegistration;