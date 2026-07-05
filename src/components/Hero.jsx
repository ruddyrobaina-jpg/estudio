import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero_bg.png';

/* ============================================================
   PARTICLE CANVAS – golden floating particles with connections
   ============================================================ */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    class Particle {
      constructor() { this.reset(true); }

      reset(randomY = false) {
        this.x = Math.random() * canvas.width;
        this.y = randomY ? Math.random() * canvas.height : canvas.height + 10;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.baseOpacity = Math.random() * 0.5 + 0.1;
        this.opacity = this.baseOpacity;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        // Fade in / fade out
        const half = this.maxLife / 2;
        this.opacity = this.life < half
          ? (this.life / half) * this.baseOpacity
          : ((this.maxLife - this.life) / half) * this.baseOpacity;
        if (this.life >= this.maxLife) this.reset();
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(212, 175, 55, ${this.opacity * 0.6})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // Init 100 particles
    for (let i = 0; i < 100; i++) particles.push(new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1, pointerEvents: 'none'
      }}
    />
  );
};

/* ============================================================
   TYPEWRITER HOOK
   ============================================================ */
const useTypewriter = (phrases, speed = 75, pause = 2400) => {
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [idx, setIdx] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const current = phrases[idx];
    let timeout;

    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && display === '') {
      setIsDeleting(false);
      setIdx(i => (i + 1) % phrases.length);
    } else {
      const delta = isDeleting ? speed / 2 : speed;
      timeout = setTimeout(() => {
        setDisplay(isDeleting
          ? display.slice(0, -1)
          : current.slice(0, display.length + 1)
        );
      }, delta);
    }
    return () => clearTimeout(timeout);
  }, [display, isDeleting, idx, phrases, speed, pause]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(interval);
  }, []);

  return { display, blink };
};

/* ============================================================
   HERO COMPONENT
   ============================================================ */
const Hero = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.22, delayChildren: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section id="inicio" className="hero-section">
      {/* Background image with subtle parallax zoom */}
      <motion.img
        src={heroBg}
        alt="Hero Background"
        className="hero-video-bg"
        style={{ opacity: 0.42 }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      {/* Content */}
      <motion.div
        className="container hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.div className="hero-eyebrow" variants={itemVariants}>
          <span className="hero-eyebrow-line" />
          <span>Estudio Jurídico — Uruguay</span>
          <span className="hero-eyebrow-line" />
        </motion.div>

        {/* Static original title */}
        <motion.h1 className="hero-title" variants={itemVariants}>
          Derecho{' '}
          <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', WebkitTextFillColor: 'var(--accent-color)' }}>Elevado</span>
          .<br />
          Resultados Tangibles.
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Una visión vanguardista para la resolución de conflictos complejos
          y estructuración corporativa en Uruguay.
        </motion.p>

        {/* CTA buttons */}
        <motion.div className="hero-actions" variants={itemVariants}>
          <a href="#contacto" className="btn btn-glow">
            <span>Agendar Consulta</span>
          </a>
          <a href="#areas" className="btn btn-outline">
            <span>Explorar Áreas</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          variants={itemVariants}
        >
          <div className="scroll-line" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
