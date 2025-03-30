import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider"; // Ensure the correct path to AuthProvider
import { motion } from "framer-motion"; // Import framer-motion

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Reference to the dropdown menu to detect outside clicks
  const dropdownRef = useRef(null);
  const profileImageRef = useRef(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle dropdown visibility on profile image click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !profileImageRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Logo */}
      <motion.div
        className="text-white text-2xl font-bold mx-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link to="/" className="hover:text-blue-300">
          Flame&Fork
        </Link>
      </motion.div>

      {/* Navigation Links for Desktop and Tablet */}
      <div className="hidden md:flex gap-8">
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <NavLink to="/" className="text-white text-lg hover:text-blue-300">
            Home
          </NavLink>
          <NavLink to="/foods" className="text-white text-lg hover:text-blue-300">
            All Foods
          </NavLink>
          <NavLink
            to="/gallery"
            className="text-white text-lg hover:text-blue-300"
          >
            Gallery
          </NavLink>
        </motion.div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu with Animation */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-16 left-0 right-0 bg-blue-800 text-white p-4 space-y-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <NavLink to="/" className="block text-lg hover:text-blue-300">
            Home
          </NavLink>
          <NavLink to="/foods" className="block text-lg hover:text-blue-300">
            All Foods
          </NavLink>
          <NavLink to="/gallery" className="block text-lg hover:text-blue-300">
            Gallery
          </NavLink>
        </motion.div>
      )}

      {/* Auth Actions */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            {/* Profile Image with enhanced styling */}
            <motion.img
              ref={profileImageRef}
              src={user.photoURL || "defaultProfile.jpg"}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-blue-500 cursor-pointer hover:border-blue-300 transition-all duration-300"
              onClick={toggleDropdown}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            />
            {/* Dropdown Menu with Animation */}
            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border-2 border-gray-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="py-2">
                  <NavLink
                    to="/my-foods"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    My Foods
                  </NavLink>
                  <NavLink
                    to="/addFood"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Add Food 
                  </NavLink>
                  <NavLink
                    to="/my-orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    My Orders
                  </NavLink>
                 
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          // Show the Login Button when the user is not logged in
          <motion.div
            className="text-white text-lg px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          >
            <Link to="/login">Login</Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
