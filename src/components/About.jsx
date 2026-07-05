import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ============================================================
   ANIMATED COUNTER HOOK
   ============================================================ */
const useAnimatedCounter = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    // Extract number from string like "25+", "500+", "1er"
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(numeric) || numeric === 0) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numeric);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return { count, ref };
};

/* ============================================================
   STAT COUNTER COMPONENT
   ============================================================ */
const StatCounter = ({ value, label }) => {
  // Detect if value has a non-numeric suffix (e.g. "+", "er")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const isNumeric = !!numericMatch;
  const numericPart = isNumeric ? parseInt(numericMatch[1]) : 0;
  const suffix = isNumeric ? numericMatch[2] : '';

  const { count, ref } = useAnimatedCounter(value, 1800);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="stat-value">
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
};

/* ============================================================
   TEAM DATA — update names/roles when you have them
   ============================================================ */
const team = [
  {
    initials: '24/7',
    name: 'Disponibilidad Total',
    role: 'Atención Permanente',
    specialty: 'Respuestas inmediatas a contingencias legales y corporativas.'
  },
  {
    initials: 'EM',
    name: 'Equipo Multidisciplinario',
    role: 'Sinergia Estratégica',
    specialty: 'Abogados, escribanos y contadores trabajando en conjunto.'
  },
  {
    initials: 'VP',
    name: 'Visión Proactiva',
    role: 'Prevención de Conflictos',
    specialty: 'Anticipación de riesgos y blindaje jurídico integral.'
  }
];

/* ============================================================
   TEAM CARD COMPONENT
   ============================================================ */
const TeamCard = ({ member, index }) => (
  <motion.div
    className="team-card"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.65, delay: index * 0.13 }}
    whileHover={{ y: -8 }}
  >
    <div className="team-avatar">
      <span>{member.initials}</span>
      <div className="avatar-ring" />
    </div>
    <div className="team-info">
      <h3 className="team-name">{member.name}</h3>
      <div className="team-role">{member.role}</div>
      <div className="team-specialty">{member.specialty}</div>
    </div>
  </motion.div>
);

/* ============================================================
   ABOUT SECTION
   ============================================================ */
const About = () => {
  return (
    <section id="equipo" className="about-section">
      <div className="container">

        {/* ── Main about grid ── */}
        <div className="about-content">
          {/* Left: text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="section-eyebrow">Quiénes Somos</div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>La Firma</h2>
            <div className="section-divider" style={{ margin: '0 0 36px 0' }} />

            <p className="about-description">
              En un mundo de negocios dinámico y desafiante, nuestra firma se erige como
              el pilar de seguridad y estrategia para empresas y líderes. Redefinimos la
              práctica legal fusionando precisión técnica con una perspectiva comercial aguda.
            </p>
            <p className="about-description">
              No solo resolvemos problemas; anticipamos escenarios y construimos
              estructuras legales impenetrables para el éxito de nuestros clientes.
            </p>

            {/* Animated counters */}
            <div className="about-stats">
              <StatCounter value="25+" label="Años Liderando" />
              <StatCounter value="500+" label="Casos Resueltos" />
              <StatCounter value="98+" label="% Satisfacción" />
            </div>
          </motion.div>

          {/* Right: animated visual */}
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="about-visual">
              <div className="about-visual-inner">
                {/* Pulsing rings */}
                <div className="about-visual-ring ring-1" />
                <div className="about-visual-ring ring-2" />
                <div className="about-visual-ring ring-3" />

                {/* Center emblem */}
                <div className="about-visual-text">
                  <motion.div
                    style={{ fontSize: '4.5rem', lineHeight: 1, marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))' }}
                    animate={{ rotateY: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ⚖️
                  </motion.div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '5px',
                    textTransform: 'uppercase'
                  }}>
                    Urugrup
                  </div>
                  <div style={{
                    color: 'var(--accent-color)',
                    fontSize: '0.75rem',
                    letterSpacing: '3px',
                    marginTop: '10px',
                    textTransform: 'uppercase'
                  }}>
                    Est. 2000 · Montevideo
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Team section ── */}
        <div className="team-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-eyebrow">Nuestro Equipo</div>
            <h2 className="section-title">El Mejor Equipo Humano</h2>
            <div className="section-divider" />
            <p className="section-subtitle">
              Trabajamos con los mejores profesionales del derecho, porque detrás de cada caso hay personas que merecen lo mejor.
            </p>
          </motion.div>

          <div className="team-grid">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
