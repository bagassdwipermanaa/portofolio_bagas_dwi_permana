import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Heart, User } from "lucide-react";

const TiltCard = ({
  title,
  subtitle,
  icon: Icon,
  gradient = "from-white/10 to-white/5",
}) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const ry = (relX - 0.5) * 18; // rotateY
    const rx = -(relY - 0.5) * 18; // rotateX
    setTilt({ rx, ry });
    setSpot({ x: relX * 100, y: relY * 100 });
  };

  const reset = () => {
    setTilt({ rx: 0, ry: 0 });
    setSpot({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.6 }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-neutral-700/50 to-neutral-600/30 border border-neutral-600 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      <div
        className={`relative rounded-2xl p-6 bg-neutral-800/90 backdrop-blur-sm overflow-hidden`}
        style={{ transform: "translateZ(0.01px)" }}
      >
        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(350px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        <div
          className="relative z-10 flex items-start gap-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="p-3 rounded-xl bg-neutral-700/50 border border-neutral-600 text-white">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-white font-space font-semibold text-lg leading-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="text-neutral-300 font-space text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* depth lines */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-space font-bold mb-6"
          >
            <span className="text-white">About Me</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-white mx-auto mb-8"
          ></motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-white/30 rotate-45"
              ></motion.div>

              <p className="text-lg text-neutral-300 leading-relaxed font-space">
                Hello! I'm {""}
                <span className="text-white font-semibold">
                  Bagas Dwi Permana
                </span>
                , a web developer passionate about crafting stunning and
                innovative digital experiences.
              </p>
            </div>

            <p className="text-neutral-300 leading-relaxed font-space">
              With expertise in modern technologies like React, JavaScript, and
              the latest frameworks, I always strive to deliver solutions that
              are not only functional but also aesthetically pleasing and
              user-friendly.
            </p>

            <p className="text-neutral-300 leading-relaxed font-space">
              I believe every project is an opportunity to learn and grow.
              Creativity and technology are the two key elements that
              continually inspire me in every work I create.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <div className="bg-neutral-800/90 border border-neutral-700 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white font-space font-semibold">
                  "Code is poetry, and every line tells a story."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Clean profile card (simpler, more elegant) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative w-72 sm:w-80 overflow-hidden rounded-2xl bg-neutral-900/60 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
            >
              <img
                src="/image/WhatsApp Image 2025-08-21 at 11.30.22_d8c88551.jpg"
                alt="Bagas Dwi Permana"
                className="w-full aspect-[3/4] object-cover"
              />

              {/* Soft sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40"></div>

              {/* Stronger bottom scrim for readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Subtle border gradient */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
              />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <h3 className="text-white font-space font-semibold text-lg text-shadow-sm">
                  Bagas Dwi Permana
                </h3>
                <p className="text-neutral-300 text-sm font-space text-shadow-sm">
                  Web Developer
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
