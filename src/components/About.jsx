import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Heart, User } from "lucide-react";

const FlipCard3D = () => {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState(0);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [lastMoveX, setLastMoveX] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Helper function untuk mendapatkan clientX dari event (mouse atau touch)
  const getClientX = (e) => {
    if (e.touches && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return e.changedTouches[0].clientX;
    }
    return e.clientX;
  };

  const getClientY = (e) => {
    if (e.touches && e.touches.length > 0) {
      return e.touches[0].clientY;
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return e.changedTouches[0].clientY;
    }
    return e.clientY;
  };

  const handleMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = getClientX(e);
    const clientY = getClientY(e);
    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;
    
    // Jika sedang drag, update rotasi drag
    if (isDragging) {
      const deltaX = clientX - dragStart.x;
      // Perhitungan rotasi yang lebih responsif - lebih sensitif
      const rotationY = Math.max(-180, Math.min(180, (deltaX / 1.5)));
      setDragRotation(rotationY);
      
      // Hitung velocity untuk smooth flip
      const now = Date.now();
      if (lastMoveTime > 0) {
        const timeDelta = now - lastMoveTime;
        const moveDelta = clientX - lastMoveX;
        if (timeDelta > 0) {
          setVelocity(moveDelta / timeDelta);
        }
      }
      setLastMoveTime(now);
      setLastMoveX(clientX);
    } else {
      // Normal tilt effect saat tidak drag
      const ry = (relX - 0.5) * 20; // rotateY
      const rx = -(relY - 0.5) * 20; // rotateX
      setTilt({ rx, ry });
      setSpot({ x: relX * 100, y: relY * 100 });
    }
  };

  const handleStart = (e) => {
    if (!cardRef.current) return;
    // Jangan preventDefault di React handler, akan dihandle di native listener
    const clientX = getClientX(e);
    const clientY = getClientY(e);
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setDragRotation(0);
    setLastMoveTime(Date.now());
    setLastMoveX(clientX);
    setVelocity(0);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    // Threshold lebih kecil (30 derajat) dan pertimbangkan velocity untuk lebih mudah flip
    const shouldFlip = Math.abs(dragRotation) > 30 || (Math.abs(dragRotation) > 15 && Math.abs(velocity) > 0.2);
    
    if (shouldFlip) {
      setIsFlipped(!isFlipped);
      setDragRotation(0);
    } else {
      // Jika tidak flip, reset ke posisi awal dengan animasi smooth
      setDragRotation(0);
    }
    
    setIsDragging(false);
    setVelocity(0);
  };

  const reset = () => {
    if (!isDragging) {
      setTilt({ rx: 0, ry: 0 });
      setSpot({ x: 50, y: 50 });
    } else {
      // Jika sedang drag dan mouse/touch leave, tetap reset drag
      handleEnd();
    }
  };

  // Handle touchstart dengan native listener untuk preventDefault
  React.useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e) => {
      // Prevent default untuk mencegah scroll
      e.preventDefault();
      const clientX = getClientX(e);
      const clientY = getClientY(e);
      setIsDragging(true);
      setDragStart({ x: clientX, y: clientY });
      setDragRotation(0);
      setLastMoveTime(Date.now());
      setLastMoveX(clientX);
      setVelocity(0);
    };

    card.addEventListener("touchstart", handleTouchStart, { passive: false });
    
    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // Handle mouse/touch move dan mouse/touch up di window untuk memastikan drag berfungsi
  React.useEffect(() => {
    if (isDragging) {
      const handleWindowMove = (e) => {
        if (!cardRef.current) return;
        // Prevent default untuk touch events
        if (e.touches) {
          e.preventDefault();
        }
        const clientX = getClientX(e);
        const deltaX = clientX - dragStart.x;
        const rotationY = Math.max(-180, Math.min(180, (deltaX / 1.5)));
        setDragRotation(rotationY);
        
        // Hitung velocity
        const now = Date.now();
        if (lastMoveTime > 0) {
          const timeDelta = now - lastMoveTime;
          const moveDelta = clientX - lastMoveX;
          if (timeDelta > 0) {
            setVelocity(moveDelta / timeDelta);
          }
        }
        setLastMoveTime(now);
        setLastMoveX(clientX);
      };

      const handleWindowEnd = () => {
        const shouldFlip = Math.abs(dragRotation) > 30 || (Math.abs(dragRotation) > 15 && Math.abs(velocity) > 0.2);
        
        if (shouldFlip) {
          setIsFlipped(!isFlipped);
          setDragRotation(0);
        } else {
          setDragRotation(0);
        }
        
        setIsDragging(false);
        setVelocity(0);
      };

      // Mouse events
      window.addEventListener("mousemove", handleWindowMove);
      window.addEventListener("mouseup", handleWindowEnd);
      // Touch events
      window.addEventListener("touchmove", handleWindowMove, { passive: false });
      window.addEventListener("touchend", handleWindowEnd);
      window.addEventListener("touchcancel", handleWindowEnd);
      
      return () => {
        window.removeEventListener("mousemove", handleWindowMove);
        window.removeEventListener("mouseup", handleWindowEnd);
        window.removeEventListener("touchmove", handleWindowMove);
        window.removeEventListener("touchend", handleWindowEnd);
        window.removeEventListener("touchcancel", handleWindowEnd);
      };
    }
  }, [isDragging, dragStart, lastMoveTime, lastMoveX, dragRotation, velocity, isFlipped]);

  return (
    <div
      className="w-64 sm:w-72 md:w-80 h-[426px] sm:h-[480px] md:h-[533px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={reset}
        onTouchEnd={handleEnd}
        className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: isDragging ? 0 : tilt.rx,
          rotateY: isDragging 
            ? (isFlipped ? 180 : 0) + dragRotation
            : isFlipped ? 180 + tilt.ry : tilt.ry,
        }}
        transition={
          isDragging
            ? { duration: 0, ease: "linear" }
            : {
                rotateY: { 
                  duration: 0.8, 
                  ease: [0.4, 0, 0.2, 1],
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                },
                rotateX: { type: "spring", stiffness: 300, damping: 20, mass: 0.6 },
              }
        }
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-neutral-900/60 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <img
            src="/image/WhatsApp Image 2025-08-21 at 11.30.22_d8c88551.jpg"
            alt="Bagas Dwi Permana - Software Engineering Student and Web Developer"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
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

          {/* Spotlight effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(400px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.15), transparent 50%)`,
            }}
          />

          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <h3 className="text-white font-heading font-semibold text-base sm:text-lg text-shadow-sm">
              Bagas Dwi Permana
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm font-body text-shadow-sm">
              Web Developer
            </p>
          </div>

          {/* Flip hint */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-white text-[10px] font-medium">Drag to flip</p>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10 flex items-center justify-center p-6 sm:p-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Spotlight effect on back */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(400px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.1), transparent 50%)`,
            }}
          />

          {/* Decorative border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            <motion.h3 
              className="text-white font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-2"
              animate={{ 
                opacity: isFlipped ? 1 : 0,
                y: isFlipped ? 0 : 20 
              }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Bagas Dwi Permana
            </motion.h3>
            <motion.div
              className="w-16 h-1 bg-white mx-auto"
              animate={{ 
                opacity: isFlipped ? 1 : 0,
                scale: isFlipped ? 1 : 0.8
              }}
              transition={{ delay: 0.3, duration: 0.3 }}
            ></motion.div>
            <motion.p
              className="text-neutral-200 font-accent font-semibold text-lg sm:text-xl md:text-2xl"
              animate={{ 
                opacity: isFlipped ? 1 : 0,
                y: isFlipped ? 0 : 20 
              }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Web Developer
            </motion.p>
          </div>

          {/* Flip hint */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-white text-[10px] font-medium">Drag to flip</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

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
        className={`relative rounded-2xl p-4 sm:p-6 bg-neutral-800/90 backdrop-blur-sm overflow-hidden`}
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
          className="relative z-10 flex items-start gap-3 sm:gap-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="p-2 sm:p-3 rounded-xl bg-neutral-700/50 border border-neutral-600 text-white">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h4 className="text-white font-heading font-semibold text-base sm:text-lg leading-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="text-neutral-300 font-body text-xs sm:text-sm mt-1">
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
    <section className="min-h-screen py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ scrollMarginTop: '100px' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6"
          >
            <span className="text-white">About Me</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-16 sm:w-24 h-1 bg-white mx-auto mb-6 sm:mb-8"
          ></motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 rotate-45"
              ></motion.div>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-body">
                Hello! I'm {""}
                <span className="text-white font-accent font-semibold">
                  Bagas Dwi Permana
                </span>
                , a web developer passionate about crafting stunning and
                innovative digital experiences.
              </p>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-body">
              With expertise in modern technologies like React, JavaScript, and
              the latest frameworks, I always strive to deliver solutions that
              are not only functional but also aesthetically pleasing and
              user-friendly.
            </p>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-body">
              I believe every project is an opportunity to learn and grow.
              Creativity and technology are the two key elements that
              continually inspire me in every work I create.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <div className="bg-neutral-800/90 border border-neutral-700 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                <p className="text-white font-accent font-semibold text-sm sm:text-base">
                  "Code is poetry, and every line tells a story."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Flip Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <FlipCard3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
