import React,{useState} from 'react';
import Updateproducts from './Updateproducts';
import Updatecategory from './updatecategory';


const Products = () => {
  const [view, setView] = useState(true)
  const viewproducts = () =>{
    setView(true)
  }
  const viewcategory = () =>{
    setView(false)
  }
  return (
    <>

      {/* Product Upload Form */}
      <div className='mt-5 ml-72 mb-5 flex justify-evenly w-80  items-center  text-[#b8dce7] font-semibold'>
      <button className={`bg-blue-800 h-14 px-4 rounded-3xl ${view ? 'border-8 box-border border-blue-300' : ''}`}
        onClick={viewproducts}
        >
          PRODUCTS
          </button>
          <button className={`bg-blue-800 h-14 px-4 rounded-3xl ${view ? '' : 'border-8 box-border border-blue-300'}`}

        onClick={viewcategory}
        >
          CATEGORY
          </button>
      </div>
     { view ? 
    <Updateproducts/> :
    <Updatecategory/>
     }
    </>
  );
};

export default Products;
