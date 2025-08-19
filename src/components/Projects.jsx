import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Github,
  Star,
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
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Employee Data Application",
      description:
        "A simple and modern C#-based application for managing employee data efficiently. Includes features for adding, editing, and deleting employee records with a user-friendly interface.",
      image: "/aplikasidatakaryawancsharpsederhana.png",
      technologies: ["C#", "MySQL"],
      category: "Full Stack",
      status: "Completed",
      pdfLink: "/aplikasidatakaryawancsharp.pdf",
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
      image: "/APLIKASI ESPORT SMK TELKOM JAKARTA.png",
      technologies: ["Figma", "Design System", "UX Research"],
      category: "UI/UX Design",
      status: "Completed",
      pdfLink: "/uiuxaplikasiesportsmktelkomjakarta.pdf",
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
      image: "/thumbnailportofoliobagas.jpg",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      category: "Full Stack",
      status: "Completed",
      pdfLink: "/webportofoliobagas.pdf",
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
      image: "/Bagas_Dwi_Permana_APK_Penilaian_Java.png",
      technologies: ["Java", "Swing", "NetBeans"],
      category: "Desktop App",
      status: "Completed",
      pdfLink: "/aplikasipenilaianjavasederhana.pdf",
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
      image: "/WEB CAREPLUS DESIGN.png",
      technologies: ["Figma", "UI/UX Design", "Design System"],
      category: "UI/UX Design",
      status: "Completed",
      pdfLink: "/webcareplusdesign.pdf",
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
      image: "/kantinmanagement.png",
      technologies: ["React", "Tailwind CSS"],
      category: "Full Stack",
      status: "Completed",
      pdfLink: "/kantenmanagementbagas.pdf",
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
      {/* Simple background */}
      <div className="absolute inset-0 bg-neutral-900/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-4">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-5xl md:text-6xl font-space font-bold text-white">
              My Projects
            </h2>
          </div>
          <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 font-space max-w-3xl mx-auto leading-relaxed">
            A collection of projects that demonstrate skill and creativity in
            modern web development, UI/UX design, and software engineering.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-space font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-white text-black shadow-lg"
                  : "bg-neutral-800 text-white border border-neutral-700 hover:border-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Debug info */}
        <div className="text-center text-white mb-6 p-4 bg-neutral-800 rounded-lg">
          <p>
            Selected: <strong>{selectedCategory}</strong> | Total:{" "}
            <strong>{projects.length}</strong> | Filtered:{" "}
            <strong>{filteredProjects.length}</strong>
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-white/50 transition-all duration-300"
              >
                {/* Project image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt={project.title}
                    src={project.image}
                  />

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/20 text-white border border-white/50">
                      {project.status}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-800/80 text-white border border-white/50">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <project.icon className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
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
                        className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-700 text-white border border-neutral-600"
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
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleViewLink(project.pdfLink, "PDF")}
                      size="sm"
                      className="flex-1 bg-white/20 border-white/50 text-white hover:bg-white/30"
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
                      className="border-white/50 text-white hover:bg-white/20"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No projects found for "{selectedCategory}"
                </h3>
                <p className="text-neutral-300 mb-6">
                  Try selecting a different category or check back later for new
                  projects.
                </p>
                <Button
                  onClick={() => setSelectedCategory("All")}
                  className="px-6 py-3 font-semibold bg-white text-black hover:bg-white/90"
                >
                  Show All Projects
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-10">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
