import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Roadmap from "@/components/Roadmap";
import LiveCodePlayground from "@/components/LiveCodePlayground";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import BackgroundEffects from "@/components/BackgroundEffects";
import Welcome from "@/components/Welcome";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    // Delay showing portfolio to allow Welcome exit animation to complete
    setTimeout(() => {
      setShowPortfolio(true);
    }, 100);
  };

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <ErrorBoundary>
      {/* Welcome Screen */}
      <AnimatePresence mode="wait">
        {showWelcome && <Welcome onLoadingComplete={handleWelcomeComplete} />}
      </AnimatePresence>

      {/* Main Portfolio */}
      <AnimatePresence mode="wait">
        {showPortfolio && (
          <motion.div
            className="min-h-screen bg-slate-950 text-gray-300 relative overflow-x-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            role="main"
            aria-label="Portfolio main content"
          >
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
