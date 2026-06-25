import React from "react";
import { FaUserCircle, FaShoppingCart, FaCog } from "react-icons/fa"; // Icons for each section

function AccountPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-300 text-gray-800 py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">My Account</h1>
        </div>
      </header>

      {/* Account Information Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-between">
            {/* Profile Picture and Info */}
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
                <FaUserCircle />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            {/* Edit Button */}
            <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Account Actions Section */}
      <section className="py-12 bg-gray-300">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AccountCard
              title="Personal Information"
              description="Update your name, email, and password."
              icon={<FaUserCircle className="text-4xl text-gray-600" />}
            />
            <AccountCard
              title="Order History"
              description="View all your previous orders."
              icon={<FaShoppingCart className="text-4xl text-gray-600" />}
            />
            <AccountCard
              title="Settings"
              description="Manage your preferences and privacy."
              icon={<FaCog className="text-4xl text-gray-600" />}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-300 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 GroceryShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function AccountCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
        Manage
      </button>
    </div>
  );
}

export default AccountPage;
