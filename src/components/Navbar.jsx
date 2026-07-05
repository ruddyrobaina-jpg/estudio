import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo_clean.png';

const navLinks = [
  { href: '#inicio', label: 'Inicio', id: 'inicio' },
  { href: '#areas', label: 'Práctica', id: 'areas' },
  { href: '#equipo', label: 'Firma', id: 'equipo' },
];

const Navbar = ({ onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Active section detection
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollY >= sections[i].offsetTop) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', marginLeft: '-40px' }}>
          <img
            src={logoImg}
            alt="Urugrup Logo"
            style={{ height: '300px', width: 'auto', objectFit: 'contain', margin: '-100px 0' }}
          />
        </a>

        {/* Desktop nav */}
        <div className="navbar-links desktop-only">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            className="btn"
            style={{ padding: '10px 24px', fontSize: '0.78rem' }}
          >
            <span>Contacto</span>
          </a>

          <button
            onClick={onOpenCV}
            className="btn btn-outline"
            style={{
              padding: '10px 24px',
              fontSize: '0.78rem',
              borderColor: 'var(--accent-color)',
              color: 'var(--accent-color)'
            }}
          >
            <span>Deja tu CV</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileMenuOpen
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={28} />
                </motion.div>
              : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={28} />
                </motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={closeMobile}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ fontSize: '1rem' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                className="btn"
                style={{ textAlign: 'center' }}
                onClick={closeMobile}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <span>Contacto</span>
              </motion.a>
              <motion.button
                onClick={() => { onOpenCV(); closeMobile(); }}
                className="btn btn-outline"
                style={{ textAlign: 'center', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>Deja tu CV</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
