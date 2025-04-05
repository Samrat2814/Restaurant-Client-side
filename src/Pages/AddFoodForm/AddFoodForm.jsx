import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddFoodForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const foodData = {
      ...data,
      addBy: { name: user?.name, email: user?.email },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/items",
        foodData
      );

      if (response.data.insertedId) {
        reset();
        toast.success("🎉 Food item added successfully!");
        navigate("/all-foods");
      } else {
        toast.error("❌ Failed to add food item! No ID returned");
      }
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("❌ Failed to add food item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Add a New Food Item
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {[
          { name: "foodName", label: "Food Name" },
          { name: "foodImage", label: "Food Image URL" },
          { name: "foodCategory", label: "Food Category" },
          { name: "foodOrigin", label: "Food Origin (Country)" },
          { name: "description", label: "Description", type: "textarea" },
        ].map(({ name, label, type }) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold">{label}</label>
            {type === "textarea" ? (
              <textarea
                {...register(name, { required: true })}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              />
            ) : (
              <input
                {...register(name, { required: true })}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              />
            )}
            {errors[name] && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </motion.div>
        ))}

        {["quantity", "price"].map((name) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input
              type="number"
              {...register(name, { required: true, min: 1 })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            />
            {errors[name] && (
              <span className="text-red-500 text-sm">Enter a valid {name}</span>
            )}
          </motion.div>
        ))}

        <motion.button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl hover:scale-105 transition-all disabled:bg-gray-400"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Adding..." : "Add Item"}
        </motion.button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </motion.div>
  );
};

export default AddFoodForm;
