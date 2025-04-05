import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
 

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium">Loading foods...</p>
    );
  }

  return (
    <div>
      {/* Page Title Section */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-300 py-16 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          All Foods
        </h1>
        <p className="text-white mt-2">Browse your favorite delicious meals</p>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search foods by name..."
          className="border rounded-full px-6 py-2 w-[80%] md:w-1/2 shadow-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
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
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {food.foodName || "Unnamed Food"}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {food.description || "No description available."}
              </p>
              <p className="font-semibold text-orange-600 mb-4">
                ${food.price || "N/A"}
              </p>
              <Link
              to={`/page-details/${food._id}`}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Details
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No food items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
