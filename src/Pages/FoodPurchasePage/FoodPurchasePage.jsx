import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodPurchasePage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getFormattedDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    const strHours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} ${strHours}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      ...formData,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyingDate: getFormattedDate(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/purchase-items",
        order
      );
      if (response.data.insertedId || response.status === 200) {
        toast.success("Order placed successfully!");
        setFormData({ foodName: "", price: "", quantity: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Purchase Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Buyer Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full mt-1 p-2 border bg-gray-100 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Buyer Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full mt-1 p-2 border bg-gray-100 rounded-xl"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl mt-4 hover:bg-blue-700 transition duration-300"
        >
          Purchase
        </motion.button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default FoodPurchasePage;
