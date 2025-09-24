'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
      className="py-8 border-t border-archonium-blue/20 w-full"
    >
      <div className="container mx-auto text-center text-archonium-silver">
        <p>&copy; {new Date().getFullYear()} Archonium. All Rights Reserved. The future is ours.</p>
        <div className="mt-4">
          {/* Add social media icons here later */}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
