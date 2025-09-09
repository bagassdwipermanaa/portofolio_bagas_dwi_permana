import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, User, Code, Palette } from "lucide-react";

const ProjectDetail = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const projectDetails = {
    1: {
      title: "Portfolio Website",
      category: "Web Design",
      publishedDate: "15 December 2024",
      author: "Bagas Dwi Permana",
      description:
        "Personal portfolio website showcasing my skills and projects with modern design and smooth interactions.",
      longDescription:
        "This portfolio website represents my journey as a developer and designer. Built with React and modern web technologies, it features a responsive design, smooth animations, and an intuitive user experience. The website serves as a digital showcase of my capabilities in web development, UI/UX design, and creative problem-solving.",
      features: [
        "Responsive Design",
        "Smooth Animations",
        "Modern UI/UX",
        "Interactive Elements",
        "Mobile Optimized",
      ],
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Framer Motion"],
      image: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullPageImage: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullImage: "/image/localhost_5173_(Nest Hub Max) (4).png",
    },
    2: {
      title: "Esport SMK Telkom Jakarta App",
      category: "Mobile App",
      publishedDate: "10 November 2024",
      author: "Bagas Dwi Permana",
      description:
        "Esport application for SMK Telkom Jakarta with modern UI/UX design and comprehensive features.",
      longDescription:
        "A comprehensive esport management application designed specifically for SMK Telkom Jakarta. This mobile app provides students with tournament management, team registration, live scoring, and community features. The app includes real-time updates, push notifications, and an intuitive interface that makes esport management seamless and engaging.",
      features: [
        "Tournament Management",
        "Team Registration",
        "Live Scoring System",
        "Push Notifications",
        "Community Features",
        "Real-time Updates",
      ],
      technologies: [
        "React Native",
        "JavaScript",
        "Firebase",
        "Node.js",
        "MongoDB",
      ],
      image: "/image/APLIKASI ESPORT SMK TELKOM JAKARTA.png",
      fullPageImage: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullImage: "/image/localhost_5173_(Nest Hub Max) (4).png",
    },
    3: {
      title: "Kantin Management System",
      category: "Desktop App",
      publishedDate: "5 October 2024",
      author: "Bagas Dwi Permana",
      description:
        "Canteen management system for efficient food service operations with inventory tracking and sales analytics.",
      longDescription:
        "A comprehensive desktop application designed to streamline canteen operations in educational institutions. The system includes inventory management, sales tracking, menu planning, staff scheduling, and financial reporting. Built with modern desktop technologies, it provides an intuitive interface for canteen staff to manage daily operations efficiently.",
      features: [
        "Inventory Management",
        "Sales Tracking",
        "Menu Planning",
        "Staff Scheduling",
        "Financial Reporting",
        "User Management",
      ],
      technologies: ["C#", "WPF", "SQL Server", "Entity Framework", "XAML"],
      image: "/image/kantinmanagement.png",
      fullPageImage: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullImage: "/image/localhost_5173_(Nest Hub Max) (4).png",
    },
    4: {
      title: "CarePlus Web Design",
      category: "Web Design",
      publishedDate: "20 September 2024",
      author: "Bagas Dwi Permana",
      description:
        "Healthcare web platform design with modern interface and user experience focused on patient care.",
      longDescription:
        "A modern healthcare web platform designed to improve patient experience and streamline healthcare services. The design focuses on accessibility, user-friendly navigation, and trust-building elements. The platform includes appointment booking, patient portal, doctor profiles, and health information management with a clean, professional aesthetic.",
      features: [
        "Appointment Booking",
        "Patient Portal",
        "Doctor Profiles",
        "Health Records",
        "Online Consultation",
        "Prescription Management",
      ],
      technologies: ["Figma", "Adobe XD", "HTML5", "CSS3", "JavaScript"],
      image: "/image/WEB CAREPLUS DESIGN.png",
      fullPageImage: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullImage: "/image/localhost_5173_(Nest Hub Max) (4).png",
    },
    5: {
      title: "Data Karyawan C# Application",
      category: "Desktop App",
      publishedDate: "15 August 2024",
      author: "Bagas Dwi Permana",
      description:
        "Employee data management application built with C# and modern interface for HR operations.",
      longDescription:
        "A comprehensive employee management system developed in C# with a modern, user-friendly interface. The application handles employee records, attendance tracking, payroll management, and performance evaluation. It features data validation, report generation, and secure data storage with role-based access control.",
      features: [
        "Employee Records",
        "Attendance Tracking",
        "Payroll Management",
        "Performance Evaluation",
        "Report Generation",
        "Role-based Access",
      ],
      technologies: [
        "C#",
        "Windows Forms",
        "SQL Server",
        "Entity Framework",
        "Crystal Reports",
      ],
      image: "/image/aplikasidatakaryawancsharpsederhana.png",
      fullPageImage: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullImage: "/image/localhost_5173_(Nest Hub Max) (4).png",
    },
    6: {
      title: "Penilaian Java Application",
      category: "Mobile App",
      publishedDate: "1 August 2024",
      author: "Bagas Dwi Permana",
      description:
        "Assessment application built with Java for educational purposes with comprehensive evaluation features.",
      longDescription:
        "An educational assessment application developed in Java for teachers and students. The app provides quiz creation, automated grading, progress tracking, and detailed analytics. It supports multiple question types, time-limited assessments, and provides instant feedback to enhance the learning experience.",
      features: [
        "Quiz Creation",
        "Automated Grading",
        "Progress Tracking",
        "Multiple Question Types",
        "Time-limited Assessments",
        "Detailed Analytics",
      ],
      technologies: [
        "Java",
        "Android Studio",
        "SQLite",
        "JSON",
        "Material Design",
      ],
      image: "/image/Bagas_Dwi_Permana_APK_Penilaian_Java.png",
      fullPageImage: "/image/localhost_5173_(Nest Hub Max) (3).png",
      fullImage: "/image/localhost_5173_(Nest Hub Max) (4).png",
    },
  };

  const detail = projectDetails[project.id];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="bg-neutral-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-neutral-900/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Project Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                    {detail.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Published at {detail.publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>by {detail.author}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white">
                  {detail.title}
                </h1>
              </div>

              {/* Project Thumbnail */}
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={detail.image}
                  alt={detail.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {detail.title}
                      </h3>
                      <p className="text-white/80 text-sm">{detail.category}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  About {detail.title} //
                </h2>
                <p className="text-lg text-gray-300">{detail.description}</p>
                <p className="text-gray-400 leading-relaxed">
                  {detail.longDescription}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {detail.features.map((feature, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {detail.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Page Image */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Full Page Preview
                </h3>
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                  <div className="bg-gray-900 p-4">
                    <img
                      src={detail.fullImage}
                      alt={`${detail.title} full preview`}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                      <p className="text-white font-semibold text-sm">
                        Full Preview
                      </p>
                      <p className="text-white/80 text-xs">
                        Complete project showcase
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div className="pt-6 border-t border-white/10">
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          Bagas Dwi Permana
                        </p>
                        <p className="text-gray-400 text-sm">
                          Developer & Designer
                        </p>
                      </div>
                    </div>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                      Contact me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetail;
