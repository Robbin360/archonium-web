'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 bg-archonium-black/50 backdrop-blur-sm fixed top-0 z-50"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-archonium-blue">ARCHONIUM</div>
        <div className="hidden md:flex">
          <a href="#about" className="mx-2 hover:text-archonium-blue transition-colors">About</a>
          <a href="#technologies" className="mx-2 hover:text-archonium-blue transition-colors">Technologies</a>
          <a href="#careers" className="mx-2 hover:text-archonium-blue transition-colors">Careers</a>
          <a href="#contact" className="mx-2 hover:text-archonium-blue transition-colors">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <a href="#about" className="block py-2 text-center hover:text-archonium-blue transition-colors" onClick={toggleMenu}>About</a>
            <a href="#technologies" className="block py-2 text-center hover:text-archonium-blue transition-colors" onClick={toggleMenu}>Technologies</a>
            <a href="#careers" className="block py-2 text-center hover:text-archonium-blue transition-colors" onClick={toggleMenu}>Careers</a>
            <a href="#contact" className="block py-2 text-center hover:text-archonium-blue transition-colors" onClick={toggleMenu}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
