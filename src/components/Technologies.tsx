'use client';
import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'Quantum Core AI', description: 'A self-evolving intelligence that powers our global network.' },
  { name: 'Neuro-Synth Interface', description: 'Seamlessly merging human consciousness with digital realms.' },
  { name: 'Atmospheric Weavers', description: 'Total climate control, powered by clean fusion energy.' },
  { name: 'Project Chimera', description: 'Bio-genetic engineering for a new era of humanity.' },
];

const Technologies = () => {
  return (
    <section id="technologies" className="py-20 bg-gray-900/20">
      <div className="container mx-auto text-center">
        <h2 className="text-archonium-blue">Our Dominion</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-archonium-black/30 rounded-lg border border-archonium-blue/20"
            >
              <h3 className="text-2xl text-archonium-blue">{tech.name}</h3>
              <p className="mt-2 text-archonium-silver">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
