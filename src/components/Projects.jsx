import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import BackgroundEffects from "./BackgroundEffects";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isOverModal, setIsOverModal] = useState(false);

  // Cursor-following values (no spring for zero-lag)
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = mvX;
  const sy = mvY;

  const projects = [
    {
      id: 1,
      title: "Creative Studio Website",
      category: "Web Design",
      preview: {
        image: "/image/thumbnailportofoliobagas.jpg",
        description:
          "Modern creative studio website with stunning visuals and smooth interactions.",
        link: "#",
      },
    },
    {
      id: 2,
      title: "Course App",
      category: "Mobile App",
      preview: {
        image: "/image/APLIKASI ESPORT SMK TELKOM JAKARTA.png",
        description: "Interactive course application with modern UI/UX design.",
        link: "#",
      },
    },
    {
      id: 3,
      title: "Money Management App",
      category: "Mobile App",
      preview: {
        image: "/image/kantinmanagement.png",
        description:
          "Comprehensive money management solution for personal finance.",
        link: "#",
      },
    },
    {
      id: 4,
      title: "Real Estate App",
      category: "Mobile App",
      preview: {
        image: "/image/WEB CAREPLUS DESIGN.png",
        description:
          "Modern real estate platform with advanced search and filtering.",
        link: "#",
      },
    },
  ];

  // Track mouse globally while a project is hovered
  useEffect(() => {
    if (!hoveredProject) return;
    const handle = (e) => {
      mvX.set(e.clientX);
      mvY.set(e.clientY);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [hoveredProject, mvX, mvY]);

  const handleOpen = (project) => {
    const url = project?.preview?.link || "#";
    if (url && url !== "#") window.open(url, "_blank");
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Shared background effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundEffects />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white leading-none">
            SELECTED WORKS
          </h2>
        </motion.div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-center justify-between py-6 sm:py-8 border-b border-white/10 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 flex-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-gray-400 group-hover:text-white transition-colors duration-300 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg font-body text-gray-500 mt-1 sm:mt-2 group-hover:text-gray-300">
                      {project.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <button
                    onClick={() => handleOpen(project)}
                    className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-red-500 group-hover:text-red-500 transition-colors duration-300 cursor-pointer"
                    aria-label="Open project"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-300 hover:rotate-45 group-hover:rotate-45" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <p className="text-base sm:text-lg lg:text-xl font-body text-gray-400 mb-6 sm:mb-8">
            Ready to see more of my work?
          </p>
          <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 border-2 border-white text-white font-accent font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base">
            Explore All Projects
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed z-50 pointer-events-none hidden md:block"
            style={{ left: sx, top: sy, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="bg-neutral-900/75 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 w-72 sm:w-80 shadow-[0_20px_60px_rgba(0,0,0,0.45)] pointer-events-auto select-none"
              onMouseEnter={() => setIsOverModal(true)}
              onMouseLeave={() => setIsOverModal(false)}
            >
              <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredProject.id}
                    src={hoveredProject.preview.image}
                    alt={hoveredProject.title}
                    className="w-full h-40 sm:h-48 object-cover will-change-transform"
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.98,
                      filter: "blur(2px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.98,
                      filter: "blur(2px)",
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>
              <motion.p
                key={`desc-${hoveredProject.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm font-body text-gray-300/90 text-center leading-relaxed"
              >
                {hoveredProject.preview.description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
