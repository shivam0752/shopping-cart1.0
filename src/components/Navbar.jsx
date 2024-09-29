import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { cart } = useSelector((state) => state);


  return (
    <div className={`shadow-md p-4 transition duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-green-400 to-blue-400'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/">
          <img
            alt="Shopping Logo"
            src="/shopping-main.png"
            className="h-12 w-12 object-contain"
          />
        </NavLink>
        <h1 className={`text-3xl font-bold bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-green-400 to-blue-400' : 'bg-gradient-to-r from-gray-800 to-gray-800'}`}>Demo Shop Cart</h1>

        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={`text-gray-700 hover:text-blue-500 transition duration-300 ${darkMode ? 'text-white hover:text-white' : 'text-gray-700 hover:text-white'}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={`relative flex items-center right-2 transition duration-300 ${darkMode ? 'text-white hover:text-white' : 'text-gray-700 hover:text-white'}`}
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          </NavLink>
          <button 
            onClick={toggleDarkMode} 
            className={`py-2 px-4 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'} transition duration-300`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
