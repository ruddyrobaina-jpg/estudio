import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer id="contacto" className="footer">
      <motion.div 
        className="container footer-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-color)' }}>Urugrup</h3>
          <p style={{ color: 'var(--secondary-color)', maxWidth: '300px', lineHeight: '1.8' }}>
            Excelencia jurídica y visión estratégica para negocios globales, operando desde el corazón financiero de Uruguay.
          </p>
        </div>
        
        <div>
          <h4 className="footer-title">Headquarters</h4>
          <ul className="footer-links">
            <li style={{ color: 'var(--secondary-color)', lineHeight: '1.8' }}>
              Plaza Independencia 811<br />
              Montevideo, 11000<br />
              Uruguay
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-title">Contacto Directo</h4>
          <ul className="footer-links">
            <li><a href="https://wa.me/59895048482" target="_blank" rel="noopener noreferrer">WhatsApp: 095 048 482</a></li>
            <li><a href="tel:+59895048482">Celular: 095 048 482</a></li>
            <li><a href="mailto:Urugup.contacto@gmail.com">Urugup.contacto@gmail.com</a></li>
          </ul>
        </div>
      </motion.div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Urugrup. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
