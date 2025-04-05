import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PageDetails = () => {
  const item = useLoaderData(); // This will load the single food item
  const navigate = useNavigate();

  // Handling Purchase Button Click
  const handlePurchase = () => {
    navigate(`/purchase/${item._id}`); // Redirect to purchase page
  };

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      {/* Food Item Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8"
      >
        {/* Food Image */}
        <motion.img
          src={item.foodImage || "https://via.placeholder.com/500x300"}
          alt={item.foodName}
          className="rounded-xl w-full h-72 object-cover mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Food Name */}
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {item.foodName}
        </motion.h1>

        {/* Food Description */}
        <motion.p
          className="text-lg text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {item.description || "No description available."}
        </motion.p>

        {/* Food Price */}
        <motion.p
          className="text-xl font-semibold text-orange-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          ${item.price || "N/A"}
        </motion.p>

        {/* Purchase Count */}
        <motion.p
          className="text-sm text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <strong>Purchase Count:</strong> {item.purchaseCount || 0}
        </motion.p>

        {/* Purchase Button */}
        <motion.button
          className="w-full md:w-auto bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <Link
            to="/food-purchase"
            className="w-full h-full flex items-center justify-center"
          >
            Purchase
          </Link>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PageDetails;
