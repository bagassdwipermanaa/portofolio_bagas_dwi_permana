import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import BackgroundEffects from "@/components/BackgroundEffects";
import Welcome from "@/components/Welcome";
import ErrorBoundary from "@/components/ErrorBoundary";
import DiscordProfile from "@/components/DiscordProfile";

// Cursor component that doesn't cause re-renders
const Cursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25 });
  const trailRef = useRef([]);
  const trailElementsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update motion values (doesn't trigger re-render)
      mouseX.set(x - 12);
      mouseY.set(y - 12);

      // Update trail directly in DOM without React state (throttled for performance)
      const now = Date.now();
      if (!trailRef.current.lastTime || now - trailRef.current.lastTime > 50) {
        trailRef.current.lastTime = now;
        
        // Create trail element directly
        const trailEl = document.createElement('div');
        trailEl.className = 'fixed w-3 h-3 rounded-full pointer-events-none z-[9998]';
        trailEl.style.background = 'radial-gradient(circle, rgba(0,180,255,0.5), transparent 70%)';
        trailEl.style.mixBlendMode = 'screen';
        trailEl.style.left = `${x - 6}px`;
        trailEl.style.top = `${y - 6}px`;
        trailEl.style.opacity = '0.5';
        trailEl.style.transform = 'scale(1)';
        trailEl.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        document.body.appendChild(trailEl);
        trailElementsRef.current.push(trailEl);

        // Animate and remove trail element
        requestAnimationFrame(() => {
          trailEl.style.opacity = '0';
          trailEl.style.transform = 'scale(0.2)';
        });

        // Remove after animation
        setTimeout(() => {
          if (trailEl.parentNode) {
            trailEl.parentNode.removeChild(trailEl);
          }
          trailElementsRef.current = trailElementsRef.current.filter(el => el !== trailEl);
        }, 450);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Cleanup trail elements
      trailElementsRef.current.forEach(el => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999]"
      style={{
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75), rgba(0,180,255,0.2) 60%, transparent 70%)",
        boxShadow: "0 0 30px rgba(0,180,255,0.35)",
        mixBlendMode: "screen",
        x: springX,
        y: springY,
      }}
    />
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    // Delay showing portfolio to allow Welcome exit animation to complete
    setTimeout(() => {
      setShowPortfolio(true);
    }, 100);
  };

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
            {/* Cooler cursor: soft glow + trailing particles - Using motion values to prevent re-renders */}
            <Cursor />

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

            <DiscordProfile />
            <Toaster />
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
