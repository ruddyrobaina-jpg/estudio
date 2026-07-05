import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const contactItems = [
    {
      icon: <MapPin size={16} strokeWidth={1.5} />,
      text: 'Plaza Independencia 811, Montevideo 11000, Uruguay',
      href: 'https://maps.google.com/?q=Plaza+Independencia+811+Montevideo',
    },
    {
      icon: <MessageCircle size={16} strokeWidth={1.5} />,
      text: 'WhatsApp: 095 048 482',
      href: 'https://wa.me/59895048482',
    },
    {
      icon: <Phone size={16} strokeWidth={1.5} />,
      text: 'Celular: 095 048 482',
      href: 'tel:+59895048482',
    },
    {
      icon: <Mail size={16} strokeWidth={1.5} />,
      text: 'Urugup.contacto@gmail.com',
      href: 'mailto:Urugup.contacto@gmail.com',
    },
  ];

  const practiceLinks = [
    { label: 'Corporate Law', href: '#areas' },
    { label: 'Litigios Civiles', href: '#areas' },
    { label: 'Laboral Corporativo', href: '#areas' },
    { label: 'Familia & Patrimonio', href: '#areas' },
    { label: 'Real Estate', href: '#areas' },
    { label: 'Notarial Premium', href: '#areas' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer id="contacto" className="footer">
      <motion.div
        className="container footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Brand column */}
        <motion.div variants={itemVariants}>
          <div className="footer-brand-name">Urugrup</div>
          <p className="footer-brand-text">
            Excelencia jurídica y visión estratégica para negocios globales,
            operando desde el corazón financiero de Uruguay.
          </p>
          <div className="footer-social-links">
            <a href="https://wa.me/59895048482" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">WA</a>
            <a href="mailto:Urugup.contacto@gmail.com" className="social-link" aria-label="Email">EM</a>
            <a href="tel:+59895048482" className="social-link" aria-label="Phone">TL</a>
          </div>
        </motion.div>

        {/* Practice areas */}
        <motion.div variants={itemVariants}>
          <h4 className="footer-title">Práctica</h4>
          <ul className="footer-links">
            {practiceLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href}>
                  <span style={{ color: 'var(--accent-color)', fontSize: '0.7rem' }}>→</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h4 className="footer-title">Contacto</h4>
          <ul className="footer-links">
            {contactItems.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-item"
                >
                  <span className="footer-contact-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p className="footer-bottom-text">
            © {year} Urugrup. Todos los derechos reservados.
          </p>
          <p className="footer-bottom-accent">
            Derecho Elevado. Resultados Tangibles.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
