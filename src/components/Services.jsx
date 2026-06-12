import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Scale, Users, Shield, Landmark } from 'lucide-react';

const services = [
  { title: 'Corporate Law', description: 'Estructuración societaria, M&A y contratos comerciales de alta complejidad.', icon: <Briefcase size={28} /> },
  { title: 'Litigios Civiles', description: 'Representación estratégica en disputas civiles, responsabilidad y arbitraje.', icon: <Scale size={28} /> },
  { title: 'Laboral Corporativo', description: 'Asesoría preventiva, negociaciones colectivas y defensa ante litigios.', icon: <Users size={28} /> },
  { title: 'Familia & Patrimonio', description: 'Gestión patrimonial, sucesiones complejas y acuerdos familiares.', icon: <Shield size={28} /> },
  { title: 'Real Estate', description: 'Desarrollos inmobiliarios, fideicomisos y estructuración de inversiones.', icon: <Landmark size={28} /> },
  { title: 'Notarial Premium', description: 'Certificaciones, fideicomisos y actas con máxima celeridad y reserva.', icon: <FileText size={28} /> }
];

const Services = () => {
  return (
    <section id="areas" className="services-section container">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Nuestra Práctica</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">
          Soluciones jurídicas sofisticadas adaptadas a las exigencias del entorno empresarial moderno.
        </p>
      </motion.div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="service-icon-wrapper">
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
