import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Footer from './components/Footer'
import CVModal from './components/CVModal'

function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar onOpenCV={() => setIsCVModalOpen(true)} />
      <Hero />
      <Services />
      <About />
      <Footer />
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  )
}

export default App
