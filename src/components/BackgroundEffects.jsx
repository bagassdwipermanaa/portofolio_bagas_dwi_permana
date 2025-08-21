import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const numParticles = Math.floor(window.innerWidth / 70);
      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          delay: Math.random() * 10,
          duration: Math.random() * 15 + 10,
          color: ["#ffffff", "#f5f5f5", "#e5e7eb"][
            Math.floor(Math.random() * 3)
          ],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);

    return () => window.removeEventListener("resize", generateParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-black"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 30%)
          `,
        }}
      ></div>

      <div className="absolute inset-0 cyber-grid opacity-[0.03]"></div>

      {/* Subtle concentric pulses (white, minimal) */}
      {[
        {
          size: 900,
          x: "50%",
          y: "45%",
          delay: 0,
        },
        {
          size: 600,
          x: "75%",
          y: "65%",
          delay: 1.5,
        },
      ].map((pulse, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `calc(${pulse.x} - ${pulse.size / 2}px)`,
            top: `calc(${pulse.y} - ${pulse.size / 2}px)`,
            width: pulse.size,
            height: pulse.size,
            borderRadius: "9999px",
            border: "1.5px solid rgba(255,255,255,0.12)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: pulse.delay,
          }}
        />
      ))}

      {/* Gentle diagonal light sweep (white) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(75deg, transparent 38%, rgba(255,255,255,0.08) 50%, transparent 62%)",
          mixBlendMode: "screen",
        }}
        animate={{ x: ["-25%", "25%", "-25%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft glowing orbs (very subtle white) */}
      {[
        { size: 260, x: "20%", y: "70%", opacity: 0.06 },
        { size: 200, x: "85%", y: "30%", opacity: 0.05 },
      ].map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute blur-3xl"
          style={{
            left: `calc(${o.x} - ${o.size / 2}px)`,
            top: `calc(${o.y} - ${o.size / 2}px)`,
            width: o.size,
            height: o.size,
            borderRadius: "9999px",
            background: "rgba(255,255,255,1)",
            opacity: o.opacity,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [o.opacity * 0.9, o.opacity, o.opacity * 0.9],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Soft vignette edges to add depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [particle.y, particle.y - (Math.random() * 50 + 50), particle.y],
            x: [
              particle.x,
              particle.x + (Math.random() * 50 - 25),
              particle.x - (Math.random() * 50 - 25),
              particle.x,
            ],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Removed large rotating outline shapes for a cleaner look */}
    </div>
  );
};

export default BackgroundEffects;
