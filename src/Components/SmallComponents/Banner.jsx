import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img from '../../../public/360_F_244611927_yrh0ZIYwOGTDurVnCMAt7Cq8DR4sBkB0.jpg'

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-100 h-[400px] flex items-center justify-center text-center px-6 sm:px-12 lg:px-24">
      {/* Banner container with reduced padding */}
      
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {/* Left Side (Heading + Description) */}
        <div className="w-full md:w-1/2">
          <motion.h1
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Taste the Joy in Every Bite 🍽️
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.5 }}
            className="text-lg sm:text-xl text-white mb-6"
          >
            Explore our delicious collection of foods made to delight your cravings.
          </motion.p>

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.7 }}
            onClick={() => navigate("/all-foods")}
            className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-100 transition"
          >
            Browse All Foods
          </motion.button>
        </div>

        {/* Right Side (Image or Graphic) */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3 }}
          className="hidden md:block w-1/2"
        >
          <img
            src={img}
            alt="Delicious Food"
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
