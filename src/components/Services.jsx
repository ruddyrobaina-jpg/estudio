import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Scale, Users, Shield, Landmark } from 'lucide-react';

const services = [
  {
    title: 'Corporate Law',
    description: 'Estructuración societaria, M&A y contratos comerciales de alta complejidad.',
    icon: <Briefcase size={28} strokeWidth={1.5} />
  },
  {
    title: 'Litigios Civiles',
    description: 'Representación estratégica en disputas civiles, responsabilidad y arbitraje.',
    icon: <Scale size={28} strokeWidth={1.5} />
  },
  {
    title: 'Laboral Corporativo',
    description: 'Asesoría preventiva, negociaciones colectivas y defensa ante litigios.',
    icon: <Users size={28} strokeWidth={1.5} />
  },
  {
    title: 'Familia & Patrimonio',
    description: 'Gestión patrimonial, sucesiones complejas y acuerdos familiares.',
    icon: <Shield size={28} strokeWidth={1.5} />
  },
  {
    title: 'Real Estate',
    description: 'Desarrollos inmobiliarios, fideicomisos y estructuración de inversiones.',
    icon: <Landmark size={28} strokeWidth={1.5} />
  },
  {
    title: 'Notarial Premium',
    description: 'Certificaciones, fideicomisos y actas con máxima celeridad y reserva.',
    icon: <FileText size={28} strokeWidth={1.5} />
  }
];

/* ============================================================
   3D TILT CARD with spotlight cursor effect
   ============================================================ */
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt: max ±12 degrees
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    // Cancel any pending frame
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(212,175,55,0.13) 0%, transparent 80%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <motion.div
      className="service-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        ref={cardRef}
        className="service-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: 'transform', transition: 'transform 0.15s ease, border-color 0.4s ease, box-shadow 0.4s ease' }}
      >
        {/* Spotlight overlay */}
        <div ref={spotlightRef} className="card-spotlight" />

        {/* Background number watermark */}
        <div className="card-number">0{index + 1}</div>

        {/* Icon */}
        <div className="service-icon-wrapper">
          {service.icon}
        </div>

        {/* Content */}
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>

        {/* Bottom animated line */}
        <div className="card-bottom-line" />
      </div>
    </motion.div>
  );
};

/* ============================================================
   SERVICES SECTION
   ============================================================ */
const Services = () => {
  return (
    <section id="areas" className="services-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Nuestras Áreas</div>
          <h2 className="section-title">Nuestra Práctica</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Soluciones jurídicas sofisticadas adaptadas a las exigencias del entorno empresarial moderno.
          </p>
        </motion.div>

        <div className="services-grid-premium">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
