import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, User, Mail, Phone, Briefcase, Link, FileText } from 'lucide-react';

const CVModal = ({ isOpen, onClose }) => {
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    nombre: '', apellido: '', correo: '', telefono: '',
    puesto: '', linkedin: '', mensaje: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      fileRef.current.files = e.dataTransfer.files;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armar el mailto con los datos del formulario
    const subject = encodeURIComponent(`Postulación CV - ${form.nombre} ${form.apellido} - ${form.puesto}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre} ${form.apellido}\n` +
      `Correo: ${form.correo}\n` +
      `Teléfono: ${form.telefono}\n` +
      `Puesto de interés: ${form.puesto}\n` +
      `LinkedIn: ${form.linkedin}\n\n` +
      `Mensaje:\n${form.mensaje}\n\n` +
      `(El candidato adjuntará su CV manualmente al correo)`
    );
    window.location.href = `mailto:Urugup.contacto@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cv-modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="cv-modal-header">
              <button className="cv-modal-close" onClick={onClose}><X size={22} /></button>
              <h2 className="cv-modal-title">
                Únete a nuestro <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>equipo</span>
              </h2>
              <p className="cv-modal-subtitle">
                Buscamos personas apasionadas y con vocación jurídica. Si querés formar parte de Urugrup, queremos conocerte.
              </p>
            </div>

            {/* Body */}
            <div className="cv-modal-body">
              {submitted ? (
                <motion.div
                  className="cv-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="cv-success-icon">✓</div>
                  <h3>¡Postulación enviada!</h3>
                  <p>Se abrirá tu cliente de correo. Adjuntá tu CV al email y envialo. ¡Muchas gracias!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="cv-form-title">
                    <span className="cv-form-line"></span> Completa tus datos
                  </h3>

                  <div className="cv-form-grid">
                    {/* Nombre */}
                    <div className="cv-field">
                      <label>Nombre *</label>
                      <div className="cv-input-wrapper">
                        <User size={16} />
                        <input required placeholder="Juan" value={form.nombre}
                          onChange={e => setForm({...form, nombre: e.target.value})} />
                      </div>
                    </div>

                    {/* Apellido */}
                    <div className="cv-field">
                      <label>Apellido *</label>
                      <div className="cv-input-wrapper">
                        <User size={16} />
                        <input required placeholder="Pérez" value={form.apellido}
                          onChange={e => setForm({...form, apellido: e.target.value})} />
                      </div>
                    </div>

                    {/* Correo */}
                    <div className="cv-field">
                      <label>Correo electrónico *</label>
                      <div className="cv-input-wrapper">
                        <Mail size={16} />
                        <input required type="email" placeholder="juan@ejemplo.com" value={form.correo}
                          onChange={e => setForm({...form, correo: e.target.value})} />
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div className="cv-field">
                      <label>Teléfono *</label>
                      <div className="cv-input-wrapper">
                        <Phone size={16} />
                        <input required placeholder="099 123 456" value={form.telefono}
                          onChange={e => setForm({...form, telefono: e.target.value})} />
                      </div>
                    </div>

                    {/* Puesto */}
                    <div className="cv-field">
                      <label>Puesto de interés *</label>
                      <div className="cv-input-wrapper">
                        <Briefcase size={16} />
                        <select required value={form.puesto}
                          onChange={e => setForm({...form, puesto: e.target.value})}>
                          <option value="">Seleccioná un puesto</option>
                          <option>Operador</option>
                          <option>Call Center</option>
                          <option>Gestor</option>
                          <option>Otro</option>
                        </select>
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="cv-field">
                      <label>Perfil de LinkedIn <span style={{fontWeight:300, color:'#888'}}>(Opcional)</span></label>
                      <div className="cv-input-wrapper">
                        <Link size={16} />
                        <input placeholder="https://linkedin.com/in/tu-perfil" value={form.linkedin}
                          onChange={e => setForm({...form, linkedin: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="cv-field cv-field-full">
                    <label>Mensaje o Carta de presentación <span style={{fontWeight:300, color:'#888'}}>(Opcional)</span></label>
                    <textarea rows={4} placeholder="Contanos brevemente sobre vos y por qué te gustaría unirte a Urugrup..."
                      value={form.mensaje} onChange={e => setForm({...form, mensaje: e.target.value})} />
                  </div>

                  {/* Adjuntar CV */}
                  <div className="cv-field cv-field-full">
                    <label>Adjuntar Currículum (PDF/DOCX) *</label>
                    <div
                      className={`cv-dropzone ${dragOver ? 'drag-over' : ''} ${fileName ? 'has-file' : ''}`}
                      onClick={() => fileRef.current.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                    >
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }} onChange={handleFileChange} />
                      {fileName ? (
                        <>
                          <FileText size={36} style={{ color: 'var(--accent-color)', marginBottom: '10px' }} />
                          <p style={{ fontWeight: 600 }}>{fileName}</p>
                          <p style={{ fontSize: '0.8rem', color: '#888' }}>Clic para cambiar</p>
                        </>
                      ) : (
                        <>
                          <Upload size={36} style={{ color: '#aaa', marginBottom: '10px' }} />
                          <p style={{ fontWeight: 600 }}>Haz clic para subir tu CV</p>
                          <p style={{ fontSize: '0.8rem', color: '#888' }}>Formatos aceptados: PDF, Word. Tamaño máx: 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="cv-submit-btn">
                    Enviar Postulación
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
