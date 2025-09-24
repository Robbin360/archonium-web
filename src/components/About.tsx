'use client';
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-archonium-blue"
        >
          Who We Are
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-3xl mx-auto text-lg text-archonium-silver"
        >
          Founded on the principle of absolute progress, Archonium has become the unchallenged leader in global technology. Our vision is singular: to steer the course of human evolution through technological supremacy. We don't follow the future; we build it.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
