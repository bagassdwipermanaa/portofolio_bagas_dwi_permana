import React from "react";
import { motion } from "framer-motion";

function Welcome() {
  const letters = "WELCOME".split("");
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const letter = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Subtle animated grid background */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          backgroundPosition: "0px 0px, 0px 0px",
        }}
        animate={{
          x: [0, 22, 0, -22, 0],
          y: [0, -22, 0, 22, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Vignette / radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 55%)",
        }}
      />

      {/* Concentric pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: i * 220, height: i * 220 }}
            initial={{ opacity: 0.18, scale: 0.9 }}
            animate={{ opacity: [0.18, 0.08, 0.18], scale: [0.9, 1.08, 0.9] }}
            transition={{
              duration: 3.2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
        {/* Headline with staggered letters and shine */}
        <div className="relative">
          <motion.div
            className="flex gap-1 md:gap-2 select-none"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {letters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                variants={letter}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                style={{
                  textShadow:
                    "0 2px 0 rgba(255,255,255,0.15), 0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
          {/* sweep highlight */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 inset-y-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-120%", opacity: 0.6 }}
            animate={{ x: "120%", opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Identity and role */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-5 text-base md:text-lg font-semibold text-gray-200"
        >
          Bagas Dwi Permana
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-1 max-w-2xl text-sm md:text-base tracking-wide text-gray-400"
        >
          Web Developer • UI/UX Enthusiast • AI Enthusiast
        </motion.p>

        {/* Progress bar synced to ~2.5s */}
        <div className="mt-8 h-1.5 w-72 md:w-96 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full w-full rounded-full bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 text-xs md:text-sm text-gray-400"
        >
          Preparing portfolio modules…
        </motion.p>
      </div>
    </div>
  );
}

export default Welcome;
