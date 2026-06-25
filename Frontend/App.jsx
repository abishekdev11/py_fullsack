import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Signup from './Signup'
import Signin from './Signin'
import Landing from './Landing'
import Navbar from './Navbar';
import Carousel from './Carousel';
import Category from './Category';
import Footer from './Footer';
import Contact from './Contact';
import Profile from './Profile';
import Products from './Products';
import Itemview from './Itemview';
import Items2 from './Items2';
import Deliverydashboard from './Deliverydashboard';
import Orderallocate from './Orderallocate';
import Cart from "./Cart";
import Accicon from "./Accicon";



function App() {

  return (
    <>
 
<BrowserRouter> 
<Routes>

<Route path="/" element={<Landing/>}></Route>
<Route path="/Signup" element={<Signup/>}></Route>
<Route path="/Signin" element={<Signin/>}></Route>
<Route path='/navbar' element={<Navbar/>}/>
<Route path='/carousel' element={<Carousel/>}/>
<Route path='/Category' element={<Category/>}/>
<Route path="/footer" element={<Footer/>}/>
<Route path="/Contact" element={<Contact/>}/>
<Route path="/Profile" element={<Profile/>}/>
<Route path='/Products' element={<Products/>}/>
<Route path='/Items2/:name' element={<Items2/>}/>
<Route path='/Itemview/:name' element={<Itemview/>}/>
<Route path='/Deliverydashboard' element={<Deliverydashboard/>}/>
<Route path='/Orderallocate' element={<Orderallocate/>}/>
<Route path='/Cart' element={<Cart/>}/>
<Route path='/Accicon' element={<Accicon/>}/>


</Routes>
</BrowserRouter>


    </>
  )
}

export default App;

