import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero_bg.png'; // We keep the image but use it with parallax or very dark overlay

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section id="inicio" className="hero-section">
      <motion.img 
        src={heroBg} 
        alt="Hero Background" 
        className="hero-video-bg"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="hero-overlay"></div>
      
      <motion.div 
        className="container hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Derecho <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Elevado</span>.<br/>Resultados Tangibles.
        </motion.h1>
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Una visión vanguardista para la resolución de conflictos complejos y estructuración corporativa en Uruguay.
        </motion.p>
        <motion.div className="hero-actions" variants={itemVariants}>
          <a href="#contacto" className="btn">Agendar Consulta</a>
          <a href="#areas" className="btn btn-outline">Explorar Áreas</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
