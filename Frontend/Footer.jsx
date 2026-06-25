import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp} from 'react-icons/fa'; 
import { FaCcVisa, FaCcMastercard, FaPaypal, FaGooglePay, FaCcApplePay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-200 text-blue-gray-800 py-1 mt-20"> {/* Reduced padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left"> {/* Reduced gap */}
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-1">Contact</h4> {/* Reduced margin-bottom */}
            <p className="text-sm">Email: support@grocerystore.com </p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>

          {/* Social Media & Payment Methods - Centered */}
          <div>
            <h4 className="text-lg font-semibold mb-1">Follow Us</h4> {/* Reduced margin-bottom */}
            <div className="flex justify-center space-x-3"> {/* Reduced space between icons */}
              <a href="/" className="text-blue-600 hover:opacity-70 transition-opacity"><FaFacebook size={20} /></a> 
              <a href="/" className="text-red-500 hover:opacity-70 transition-opacity"><FaInstagram size={20} /></a> 
              <a href="/" className="text-blue-400 hover:opacity-70 transition-opacity"><FaTwitter size={20} /></a> 
              <a href="/" className="text-green-500 hover:opacity-70 transition-opacity"><FaWhatsapp size={20} /></a> 
            </div>

            <h4 className="text-lg font-semibold mt-2 mb-1">Payment Methods</h4> {/* Reduced margins */}
            <div className="flex justify-center space-x-3"> {/* Reduced space */}
              <FaCcVisa size={20} className="text-blue-800 hover:text-green-400 transition-colors" />
              <FaCcMastercard size={20} className="text-red-600 hover:text-green-400 transition-colors" />
              <FaPaypal size={20} className="text-blue-800 hover:text-green-400 transition-colors" />
              <FaGooglePay size={20} className="text-gray-800 hover:text-green-400 transition-colors" />
              <FaCcApplePay size={20} className="text-gray-800 hover:text-green-400 transition-colors" />
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-1">Customer Service</h4> {/* Reduced margin-bottom */}
            <ul className="list-none text-sm">
              <li><a href="/" className="hover:text-green-400 transition-colors">Contact Us</a></li>
              <li><a href="/" className="hover:text-green-400 transition-colors">Returns</a></li>
              <li><a href="/" className="hover:text-green-400 transition-colors">FAQs</a></li>
              <li><a href="/" className="hover:text-green-400 transition-colors">Shipping Info</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-lg mt-4"> {/* Reduced font size & padding */}
          <p>&copy; 2025 Kattapai_Market. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
