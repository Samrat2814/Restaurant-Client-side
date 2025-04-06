import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const MyFoods = () => {
  const { user, loading } = useContext(AuthContext); // Get user and loading state from AuthContext
  const [foodItems, setFoodItems] = useState([]); // State to store food items

  useEffect(() => {
    // Only run the fetch if user is available and not loading
    if (user && user.email && !loading) {
      const fetchFoodItems = async () => {
        try {
          const response = await axios.get("http://localhost:5000/my-foods", {
            params: { email: user.email },
          });
          setFoodItems(response.data); // Set fetched food items
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      };

      fetchFoodItems();
    }
  }, [user, loading]); // Dependency array: Run effect again if user or loading state changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while waiting for user state
  }

  if (!user || foodItems.length === 0) {
    return <div>No food items found.</div>; // Handle case where no food items are available
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
        My Foods
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {foodItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-between"
          >
            <img
              src={item.foodImage}
              alt={item.foodName}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold">{item.foodName}</h3>
            <p className="text-sm text-gray-600">{item.foodCategory}</p>
            <p className="text-lg font-bold mt-2">Price: ${item.price}</p>
            <p className="text-sm text-gray-600">{item.description}</p>

            {/* Placeholder Update Button */}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
