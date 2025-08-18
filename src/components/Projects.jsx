import React from "react";
import { motion } from "framer-motion";
import { FileText, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Projects = () => {
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
      gradient: "from-cyber-blue to-cyber-purple",
      pdfLink: "/aplikasidatakaryawancsharp.pdf",
      githubLink: "https://github.com/CodeWithBagas/project-c-bagas",
      isPrivate: false,
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
      gradient: "from-cyber-purple to-cyber-pink",
      pdfLink: "/uiuxaplikasiesportsmktelkomjakarta.pdf",
      githubLink: "https://github.com/CodeWithBagas/uiux-esport-smktelkom",
      isPrivate: false,
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
      gradient: "from-cyber-pink to-cyber-green",
      pdfLink: "/webportofoliobagas.pdf",
      githubLink: "https://github.com/CodeWithBagas/uiux-esport-smktelkom",
      isPrivate: true,
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
      gradient: "from-yellow-400 to-orange-600",
      pdfLink: "/aplikasipenilaianjavasederhana.pdf",
      githubLink: "http://github.com/CodeWithBagas/penilaian-sederhana-java",
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
      gradient: "from-teal-400 to-blue-600",
      pdfLink: "webcareplusdesign.pdf",
      githubLink: "https://github.com/CodeWithBagas/web-careplus-uiux-design",
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
      gradient: "from-cyber-blue to-cyber-purple",
      pdfLink: "/kantenmanagementbagas.pdf",
      githubLink:
        "https://github.com/bagassdwipermanaa/kantinmanagement-bybagas",
    },
  ];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-green/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-blue">
              My Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-green to-cyber-blue mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-space max-w-3xl mx-auto">
            A collection of projects that demonstrate skill and creativity in
            modern web development.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="project-card rounded-xl overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={`${project.title} - ${project.description}`}
                  src={project.image}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-2 w-full">
                    <Button
                      onClick={() => handleViewLink(project.pdfLink, "PDF")}
                      size="sm"
                      className="cyber-button flex-1"
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
                      className="cyber-button border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-space font-semibold rounded-full ${
                      project.status === "Completed"
                        ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
                        : "bg-cyber-yellow/20 text-cyber-yellow border border-cyber-yellow/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-space font-semibold text-cyber-blue uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1 text-white/80">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-space font-bold text-white mb-3 group-hover:text-cyber-blue transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm font-space leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 text-xs font-space font-medium rounded bg-white/10 text-white border border-white/20 backdrop-blur-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-cyber-blue/30 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-space font-bold text-white mb-4">
              Interested in my project?
            </h3>
            <p className="text-gray-300 font-space mb-6 max-w-2xl mx-auto">
              Let's collaborate and create something amazing together!
            </p>
            <Button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="cyber-button px-8 py-3 text-lg font-space font-semibold"
            >
              Contact me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
