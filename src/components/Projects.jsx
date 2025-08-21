import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Github,
  ExternalLink,
  Zap,
  Code,
  Palette,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Employee Data Application",
      description:
        "A simple and modern C#-based application for managing employee data efficiently. Includes features for adding, editing, and deleting employee records with a user-friendly interface.",
      image: "/image/aplikasidatakaryawancsharpsederhana.png",
      technologies: ["C#", "MySQL"],
      category: "Full Stack",
      status: "Completed",
      pdfLink: "/image/aplikasidatakaryawancsharp.pdf",
      githubLink: "https://github.com/CodeWithBagas/project-c-bagas",
      isPrivate: false,
      icon: Code,
      complexity: "Intermediate",
      duration: "3 weeks",
    },
    {
      id: 2,
      title: "SMK Telkom Jakarta E-Sport App UI/UX",
      description:
        "A UI/UX design prototype created using Figma to support E-Sport extracurricular activities at SMK Telkom Jakarta. The design focuses on providing access to curated learning materials, match analysis, and team coordination tools.",
      image: "/image/APLIKASI ESPORT SMK TELKOM JAKARTA.png",
      technologies: ["Figma", "Design System", "UX Research"],
      category: "UI/UX Design",
      status: "Completed",
      pdfLink: "/image/uiuxaplikasiesportsmktelkomjakarta.pdf",
      githubLink: "https://github.com/CodeWithBagas/uiux-esport-smktelkom",
      isPrivate: false,
      icon: Palette,
      complexity: "Advanced",
      duration: "4 weeks",
    },
    {
      id: 3,
      title: "Bagas Personal Web Portfolio",
      description:
        "A modern and responsive personal portfolio website to showcase projects, certificates, and technical skills. Built with smooth animations, futuristic UI elements, and optimized for all devices.",
      image: "/image/thumbnailportofoliobagas.jpg",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      category: "Full Stack",
      status: "Completed",
      pdfLink: "/image/webportofoliobagas.pdf",
      githubLink: "https://github.com/CodeWithBagas/uiux-esport-smktelkom",
      isPrivate: true,
      icon: Code,
      complexity: "Advanced",
      duration: "6 weeks",
    },
    {
      id: 4,
      title: "Student Grading Application",
      description:
        "A simple desktop application built with Java Swing to manage and calculate student grades. Designed with a user-friendly interface and essential features for inputting, processing, and displaying grade data.",
      image: "/image/Bagas_Dwi_Permana_APK_Penilaian_Java.png",
      technologies: ["Java", "Swing", "NetBeans"],
      category: "Desktop App",
      status: "Completed",
      pdfLink: "/image/aplikasipenilaianjavasederhana.pdf",
      githubLink: "http://github.com/CodeWithBagas/penilaian-sederhana-java",
      icon: Monitor,
      complexity: "Beginner",
      duration: "2 weeks",
    },
    {
      id: 5,
      title: "Web Care Plus – UI/UX Design",
      description:
        "User interface and experience design for a digital healthcare service platform. Focused on intuitive access, user comfort, and a clean, modern aesthetic tailored for medical service users.",
      image: "/image/WEB CAREPLUS DESIGN.png",
      technologies: ["Figma", "UI/UX Design", "Design System"],
      category: "UI/UX Design",
      status: "Completed",
      pdfLink: "/image/webcareplusdesign.pdf",
      githubLink: "https://github.com/CodeWithBagas/web-careplus-uiux-design",
      icon: Palette,
      complexity: "Advanced",
      duration: "5 weeks",
    },
    {
      id: 6,
      title: "Canteen Management System",
      description:
        "A modern and responsive web application built with React and Tailwind CSS to manage canteen products and transactions efficiently. Features include adding, editing, and deleting product items with a clean and intuitive interface.",
      image: "/image/kantinmanagement.png",
      technologies: ["React", "Tailwind CSS"],
      category: "Full Stack",
      status: "Completed",
      pdfLink: "/image/kantenmanagementbagas.pdf",
      githubLink:
        "https://github.com/bagassdwipermanaa/kantinmanagement-bybagas",
      icon: Code,
      complexity: "Intermediate",
      duration: "4 weeks",
    },
  ];

  const categories = ["All", "Full Stack", "UI/UX Design", "Desktop App"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleViewLink = (url, type, isPrivate = false) => {
    if (isPrivate) {
      toast({
        title: `🔒 This ${type} project is private.`,
        description: `Access to this ${type} repository is restricted.`,
        variant: "destructive",
        duration: 5000,
      });
    } else if (url === "#") {
      toast({
        title: `🚧 ${type} URL Not Set!`,
        description: `Please replace '#' with your actual ${type} URL in the code.`,
        variant: "destructive",
        duration: 5000,
      });
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Use global background only (no extra overlay) */}
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-4">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-5xl md:text-6xl font-space font-bold text-white">
              My Projects
            </h2>
          </motion.div>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-white mx-auto mb-8 rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-300 font-space max-w-3xl mx-auto leading-relaxed"
          >
            A collection of projects that demonstrate skill and creativity in
            modern web development, UI/UX design, and software engineering.
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-space font-semibold transition-all duration-200 ring-1 ${
                selectedCategory === category
                  ? "bg-white text-black ring-white/60"
                  : "bg-neutral-900/60 text-white ring-white/10 hover:ring-white/30 hover:bg-neutral-800"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={`${selectedCategory}-${project.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="group rounded-xl overflow-hidden bg-neutral-900/60 border border-white/10 ring-1 ring-white/5 transition-shadow duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={project.title}
                      src={project.image}
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-white/20 text-white border border-white/40 backdrop-blur-sm">
                        {project.status}
                      </span>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-neutral-900/70 text-white border border-white/30 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <project.icon className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-neutral-800 text-white border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project info */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                      <span>Complexity: {project.complexity}</span>
                      <span>Duration: {project.duration}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleViewLink(project.pdfLink, "PDF")}
                        size="sm"
                        className="flex-1 bg-white text-black hover:bg-white/90"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button
                        onClick={() =>
                          handleViewLink(
                            project.githubLink,
                            "GitHub",
                            project.isPrivate
                          )
                        }
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Code className="w-10 h-10 text-black" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-white mb-4"
                  >
                    No projects found for "{selectedCategory}"
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-neutral-300 mb-6"
                  >
                    Try selecting a different category or check back later for
                    new projects.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      onClick={() => setSelectedCategory("All")}
                      className="px-6 py-3 font-semibold bg-white text-black hover:bg-white/90"
                    >
                      Show All Projects
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to action */}
        <div className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-neutral-800 border border-neutral-700 rounded-2xl p-10"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-4">
                <ExternalLink className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white">
                Interested in my projects?
              </h3>
            </div>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Each project represents a unique challenge and learning
              experience, showcasing my growth as a developer and designer.
            </p>
            <Button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-10 py-4 text-lg font-semibold bg-white text-black hover:bg-white/90"
            >
              Let's Connect
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
