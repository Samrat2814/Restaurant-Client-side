import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TopFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        // Sort foods by the number of purchases in descending order
        const sortedFoods = response.data.sort(
          (a, b) => b.purchaseCount - a.purchaseCount
        );
        // Get the top 6 selling foods
        setFoods(sortedFoods.slice(0, 6));
      } catch (error) {
        console.error("Error fetching top food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopFoods();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium">
        Loading top foods...
      </p>
    );
  }

  return (
    <div className="mt-16 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">
          Top-Selling Foods
        </h2>
        <p className="text-gray-700 text-lg">
          These are the most popular food items based on customer purchases.
        </p>
      </div>

      {/* Food Cards Grid for Top-Selling Foods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food) => (
          <motion.div
            key={food._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 border hover:shadow-2xl"
          >
            <img
              src={food.foodImage || "https://via.placeholder.com/300x200"}
              alt={food.foodName || "Food"}
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {food.foodName || "Unnamed Food"}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {food.description || "No description available."}
            </p>
            <p className="font-semibold text-orange-600 mb-4">
              ${food.price || "N/A"}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Purchases: {food.purchaseCount || 0}
            </p>

            <Link
              to={`page-details/${food._id}`}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Details
            </Link>
          </motion.div>
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/all-foods")}
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          See All Foods
        </button>
      </div>
    </div>
  );
};

export default TopFood;
