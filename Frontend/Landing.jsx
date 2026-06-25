import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Category from "./Category";
import Footer from "./Footer";
import Accicon from "./Accicon";
import Searchbar from "./Searchbar";


export default function Landing() {
   
    return (
      <>
<div className="bg-blue-200 ">  
<div className="flex  mt-4"><Navbar/> <Accicon/></div>
<Searchbar/>
<Carousel/>
<Category/>
<Footer/>
</div> 
</>


    );
  }
