import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";

const images = [
  "../../../public/360_F_244611927_yrh0ZIYwOGTDurVnCMAt7Cq8DR4sBkB0.jpg",
  "../../../public/pizza.jpg",
  "../../../public/pasta.avif",
  "../../../public/shushi.jpeg",
  "../../../public/salad.jpg",
  "../../../public/deserts.jpeg",
  "../../../public/drinks.jpeg",
  "../../../public/tacos.jpeg",
  "../../../public/cakes.jpeg",
  "../../../public/ramen.jpeg",
  
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-purple-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Gallery
      </motion.h1>

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="cursor-pointer overflow-hidden rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-48 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={images.map((src) => ({ src }))}
      />
    </div>
  );
};

export default Gallery;
