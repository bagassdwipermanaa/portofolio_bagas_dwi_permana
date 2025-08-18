import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const numParticles = Math.floor(window.innerWidth / 50);
      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          delay: Math.random() * 10,
          duration: Math.random() * 15 + 10,
          color: ["#00f5ff", "#8b5cf6", "#3b82f6"][
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

      <div className="absolute inset-0 cyber-grid opacity-[0.02]"></div>

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

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyber-blue/5 rotate-[30deg] opacity-20"
        animate={{
          rotate: [30, 390],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-cyber-purple/5 rounded-full opacity-20"
        animate={{
          rotate: [0, -360],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
