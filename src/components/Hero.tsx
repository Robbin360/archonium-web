'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-archonium-white drop-shadow-lg">
          Forging the Future.
        </h1>
        <p className="text-lg sm:text-xl text-archonium-silver mt-4 max-w-2xl mx-auto">
          Archonium is not just a company. We are the architects of tomorrow, building the very fabric of the new world.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 168, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-archonium-blue text-white font-bold rounded-lg"
        >
          Discover Our Power
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
