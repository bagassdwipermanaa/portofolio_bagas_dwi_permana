import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Roadmap from '@/components/Roadmap';
import LiveCodePlayground from '@/components/LiveCodePlayground';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import BackgroundEffects from '@/components/BackgroundEffects';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
      setTrail((prev) => {
        const next = [...prev, { x, y, id: Date.now() + Math.random() }];
        return next.slice(-10);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyber-blue/70 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.h2
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-space font-bold text-cyber-blue/70"
          >
            Initializing Interface<span className="loading-dots"></span>
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-300 relative overflow-x-hidden">
      {/* Cooler cursor: soft glow + trailing particles */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75), rgba(0,180,255,0.2) 60%, transparent 70%)",
          boxShadow: "0 0 30px rgba(0,180,255,0.35)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      {trail.map((p, i) => (
        <motion.div
          key={p.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-[9998]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,180,255,0.5), transparent 70%)",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0.5, scale: 1, x: p.x - 6, y: p.y - 6 }}
          animate={{ opacity: 0, scale: 0.2, x: p.x - 6, y: p.y - 6 }}
          transition={{ duration: 0.4 + i * 0.02, ease: "easeOut" }}
        />
      ))}
      
      <BackgroundEffects />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          
          <main>
            <section id="home">
              <Hero />
            </section>
            
            <section id="about">
              <About />
            </section>
            
            <section id="education">
              <Education />
            </section>
            
            <section id="projects">
              <Projects />
            </section>

            <section id="certifications">
              <Certifications />
            </section>
            
            <section id="roadmap">
              <Roadmap />
            </section>
            
            <section id="playground">
              <LiveCodePlayground />
            </section>
            
            <section id="faq">
              <FAQ />
            </section>
            
            <section id="contact">
              <Contact />
            </section>
          </main>
          
          <Footer />
        </motion.div>
      </AnimatePresence>
      
      <Toaster />
    </div>
  );
}

export default App;