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
    <section className="py-20 relative overflow-hidden">
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

          {/* Right side - Clean 3D Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Subtle Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Interactive Lanyard */}
              <motion.div
                className="relative w-80 h-96 cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={{
                  top: -100,
                  left: -100,
                  right: 100,
                  bottom: 100,
                }}
                dragElastic={0.4}
                dragTransition={{
                  bounceStiffness: 200,
                  bounceDamping: 20,
                }}
                whileDrag={{
                  scale: 1.05,
                  rotateZ: 3,
                  transition: { duration: 0.1 },
                }}
                animate={{
                  y: [0, -8, 0],
                  rotateZ: [0, 1, -1, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateZ: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Realistic Lanyard String */}
                <motion.div
                  className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-2 h-24"
                  style={{
                    background:
                      "linear-gradient(180deg, #1e40af 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #3b82f6 100%)",
                    borderRadius: "1px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  }}
                  animate={{
                    rotateZ: [0, 5, -5, 0],
                    scaleY: [1, 1.1, 1],
                  }}
                  transition={{
                    rotateZ: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scaleY: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />

                {/* String Connector */}
                <motion.div
                  className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                  animate={{
                    scaleX: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Lanyard Ring */}
                <motion.div
                  className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-12 h-12"
                  style={{
                    background: "linear-gradient(145deg, #3b82f6, #8b5cf6)",
                    borderRadius: "50%",
                    border: "2px solid #1e40af",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)",
                  }}
                  animate={{
                    rotateZ: [0, 360],
                    scale: [1, 1.08, 1],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    rotateZ: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />

                {/* Ring Inner Glow */}
                <motion.div
                  className="absolute -top-30 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/15 rounded-full"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Main Lanyard Card */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    transform: "translateZ(20px)",
                    boxShadow:
                      "0 15px 35px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                >
                  <img
                    src="/image/WhatsApp Image 2025-08-21 at 11.30.22_d8c88551.jpg"
                    alt="Bagas Dwi Permana"
                    className="w-full h-full object-cover"
                  />

                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>

                  {/* Lanyard border */}
                  <div className="absolute inset-0 border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl"></div>
                </motion.div>

                {/* 3D Edges with Lanyard Style */}
                <div
                  className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-blue-800 to-purple-800 rounded-t-2xl"
                  style={{
                    transform:
                      "rotateX(-90deg) translateZ(20px) translateY(-3px)",
                  }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-purple-800 to-pink-800 rounded-b-2xl"
                  style={{
                    transform:
                      "rotateX(90deg) translateZ(20px) translateY(3px)",
                  }}
                ></div>
                <div
                  className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-blue-800 to-purple-800 rounded-l-2xl"
                  style={{
                    transform:
                      "rotateY(90deg) translateZ(20px) translateX(-3px)",
                  }}
                ></div>
                <div
                  className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-purple-800 to-pink-800 rounded-r-2xl"
                  style={{
                    transform:
                      "rotateY(-90deg) translateZ(20px) translateX(3px)",
                  }}
                ></div>

                {/* Floating Particles */}
                <motion.div
                  className="absolute -top-8 -right-8 w-3 h-3 bg-blue-400 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-2 h-2 bg-purple-400 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-pink-400 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />

                {/* Dynamic Shadow */}
                <motion.div
                  className="absolute -bottom-6 left-6 right-6 h-8 bg-black/40 rounded-2xl blur-xl"
                  style={{
                    transform: "translateZ(0px)",
                  }}
                  animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
