import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = [
    {
      id: 1,
      title: "Creative Studio Website",
      category: "Web Design",
      arrowColor: "text-white",
      preview: {
        image: "/image/thumbnailportofoliobagas.jpg",
        description:
          "Modern creative studio website with stunning visuals and smooth interactions.",
      },
    },
    {
      id: 2,
      title: "Course App",
      category: "Mobile App",
      arrowColor: "text-orange-500",
      preview: {
        image: "/image/APLIKASI ESPORT SMK TELKOM JAKARTA.png",
        description: "Interactive course application with modern UI/UX design.",
      },
    },
    {
      id: 3,
      title: "Money Management App",
      category: "Mobile App",
      arrowColor: "text-white",
      preview: {
        image: "/image/kantinmanagement.png",
        description:
          "Comprehensive money management solution for personal finance.",
      },
    },
    {
      id: 4,
      title: "Real Estate App",
      category: "Mobile App",
      arrowColor: "text-white",
      preview: {
        image: "/image/WEB CAREPLUS DESIGN.png",
        description:
          "Modern real estate platform with advanced search and filtering.",
      },
    },
  ];

  const handleMouseMove = (e) => {
    if (hoveredProject) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <section
      className="py-32 relative overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none">
            SELECTED WORKS
          </h2>
        </motion.div>

        {/* Projects List */}
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
              {/* Project Row */}
              <div className="flex items-center justify-between py-8 border-b border-white/10 hover:border-white/20 transition-colors duration-300">
                {/* Left Side - Project Info */}
                <div className="flex items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-lg font-body text-gray-400 mt-2">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Right Side - Arrow */}
                <div className="flex items-center gap-4">
                  <ArrowUpRight
                    className={`w-8 h-8 ${project.arrowColor} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-xl font-body text-gray-400 mb-8">
            Ready to see more of my work?
          </p>
          <button className="px-10 py-4 border-2 border-white text-white font-accent font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Explore All Projects
          </button>
        </motion.div>
      </div>

      {/* Floating Hover Modal - Follows Cursor Smoothly */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePosition.x + 25,
              top: mousePosition.y - 120,
            }}
          >
            <div className="bg-neutral-800/95 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-6 w-80 shadow-2xl pointer-events-auto">
              {/* Project Preview Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={hoveredProject.preview.image}
                  alt={hoveredProject.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* View Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-110">
                    <ArrowRight className="w-6 h-6 text-orange-500" />
                  </button>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-sm font-body text-gray-300 text-center leading-relaxed">
                {hoveredProject.preview.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
