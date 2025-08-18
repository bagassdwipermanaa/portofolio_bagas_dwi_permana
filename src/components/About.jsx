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
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-white/5 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      <div
        className={`relative rounded-2xl p-6 bg-gradient-to-b ${gradient} backdrop-blur-sm overflow-hidden`}
        style={{ transform: "translateZ(0.01px)" }}
      >
        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(350px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.15), transparent 40%)`,
          }}
        />

        <div
          className="relative z-10 flex items-start gap-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-white">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-white font-space font-semibold text-lg leading-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="text-gray-300/80 font-space text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* depth lines */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent"></div>

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">
              About Me
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mb-8"
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
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-cyber-blue/30 rotate-45"
              ></motion.div>

              <p className="text-lg text-gray-300 leading-relaxed font-space">
                Hello! I'm {""}
                <span className="text-cyber-blue font-semibold">
                  Bagas Dwi Permana
                </span>
                , a web developer passionate about crafting stunning and
                innovative digital experiences.
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed font-space">
              With expertise in modern technologies like React, JavaScript, and
              the latest frameworks, I always strive to deliver solutions that
              are not only functional but also aesthetically pleasing and
              user-friendly.
            </p>

            <p className="text-gray-300 leading-relaxed font-space">
              I believe every project is an opportunity to learn and grow.
              Creativity and technology are the two key elements that
              continually inspire me in every work I create.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <div className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-cyber-blue font-space font-semibold">
                  "Code is poetry, and every line tells a story."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            <TiltCard
              title="Bagas Dwi Permana"
              subtitle="Frontend Developer"
              icon={User}
              gradient="from-white/10 to-white/0"
            />
            <TiltCard
              title="UI/UX Design"
              subtitle="Crafting intuitive interfaces"
              icon={Palette}
              gradient="from-white/8 to-white/0"
            />
            <TiltCard
              title="Performance"
              subtitle="Optimized, fast, efficient"
              icon={Zap}
              gradient="from-white/8 to-white/0"
            />
            <TiltCard
              title="Problem Solving"
              subtitle="Clean, maintainable solutions"
              icon={Heart}
              gradient="from-white/8 to-white/0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
