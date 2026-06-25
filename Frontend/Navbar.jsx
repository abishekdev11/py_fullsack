import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navRef = useRef(); // Ref for the mobile nav

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Delivery', link: '/Deliverydashboard' },
    { id: 2, text: 'Order', link: '/Orderallocate' },
    { id: 3, text: 'Cart', link: '/Cart' },
    { id: 4, text: 'Contact', link: '/Contact' },
    { id: 5, text: 'Products', link: '/Products' },
  ];

  // Close navbar on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (nav && navRef.current && !navRef.current.contains(event.target)) {
        setNav(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [nav]);

  return (
    <>
      <div className='bg-blue-600 flex justify-evenly w-full rounded-3xl items-center h-14 px-4 text-[#b8dce7] font-semibold'>
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center'>
          <ul className='flex'>
            {navItems.map((item) => (
              <a key={item.id} href={item.link}>
                <li className='py-1 px-7 hover:bg-[#defaf3] hover:-translate-y-1 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
                  {item.text}
                </li>
              </a>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden z-50'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          ref={navRef}
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#578FCA] ease-in-out duration-500 z-40'
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>
            KATTAPAI MARKET
          </h1>
          {navItems.map((item) => (
            <a key={item.id} href={item.link}>
              <li className='p-4 border-b rounded-xl hover:bg-[#defaf3] duration-300 hover:text-black cursor-pointer border-gray-600'>
                {item.text}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
