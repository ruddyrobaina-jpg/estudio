import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scale } from 'lucide-react';
import logoImg from '../assets/logo_clean.png';

const Navbar = ({ onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container navbar-container">
        <a href="#" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', marginLeft: '-40px' }}>
          <img src={logoImg} alt="Urugrup Logo" style={{ height: '300px', width: 'auto', objectFit: 'contain', margin: '-100px 0' }} />
        </a>

        {/* Desktop Menu */}
        <div className="navbar-links desktop-only">
          <a href="#inicio" className="nav-link">Inicio</a>
          <a href="#areas" className="nav-link">Práctica</a>
          <a href="#equipo" className="nav-link">Firma</a>
          <a href="#contacto" className="btn" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>Contacto</a>
          <button onClick={onOpenCV} className="btn btn-outline" style={{ padding: '10px 24px', fontSize: '0.85rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)', cursor: 'pointer' }}>Deja tu CV aquí</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'absolute', top: '100%', left: 0, width: '100%', 
              backgroundColor: 'var(--bg-secondary)', padding: '20px', 
              display: 'flex', flexDirection: 'column', gap: '15px' 
            }}
          >
            <a href="#inicio" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Inicio</a>
            <a href="#areas" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Práctica</a>
            <a href="#equipo" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Firma</a>
            <a href="#contacto" className="btn" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Contacto</a>
            <button onClick={() => { onOpenCV(); setIsMobileMenuOpen(false); }} className="btn btn-outline" style={{ textAlign: 'center', borderColor: 'var(--accent-color)', color: 'var(--accent-color)', cursor: 'pointer' }}>Deja tu CV aquí</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
