import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="equipo" className="about-section container">
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '10px' }}>La Firma</h2>
          <div className="section-divider" style={{ margin: '0 0 30px 0' }}></div>
          <p className="about-description">
            En un mundo de negocios dinámico y desafiante, nuestra firma se erige como el pilar de seguridad y estrategia para empresas y líderes. Redefinimos la práctica legal fusionando precisión técnica con una perspectiva comercial aguda.
          </p>
          <p className="about-description">
            No solo resolvemos problemas; anticipamos escenarios y construimos estructuras legales impenetrables.
          </p>
          
          <div className="about-stats">
            <div>
              <div className="stat-value">25+</div>
              <div className="stat-label">Años Liderando</div>
            </div>
            <div>
              <div className="stat-value">M&A</div>
              <div className="stat-label">Especialistas</div>
            </div>
            <div>
              <div className="stat-value">1er</div>
              <div className="stat-label">Nivel de Servicio</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="about-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Abstract dark placeholder */}
          <div style={{
            background: 'linear-gradient(135deg, #171717 0%, #0a0a0a 100%)',
            height: '600px',
            borderRadius: '0', // Sharp edges
            border: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Geometric accents */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }}></div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'rgba(255,255,255,0.03)', transform: 'rotate(-90deg)', letterSpacing: '10px', whiteSpace: 'nowrap' }}>
              EXCELLENCE
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
