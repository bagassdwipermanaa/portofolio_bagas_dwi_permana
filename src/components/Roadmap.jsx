import React from "react";
import { motion } from "framer-motion";

const Roadmap = () => {
  const roadmapData = [
    {
      year: "2024",
      title: "Full Stack Development",
      description: "Menguasai React, Node.js, dan database management",
      skills: ["React", "Node.js", "MongoDB", "Express.js"],
      status: "current",
      icon: "🚀",
    },
    {
      year: "2023",
      title: "Frontend Development",
      description: "Belajar HTML, CSS, JavaScript dan framework modern",
      skills: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
      status: "completed",
      icon: "🎨",
    },
    {
      year: "2022",
      title: "Programming Fundamentals",
      description: "Memulai dengan bahasa pemrograman dasar",
      skills: ["Java", "C#", "Python", "SQL"],
      status: "completed",
      icon: "💻",
    },
    {
      year: "2025",
      title: "Advanced Technologies",
      description: "Eksplorasi AI, Machine Learning, dan Cloud Computing",
      skills: ["AI/ML", "AWS", "Docker", "Kubernetes"],
      status: "planned",
      icon: "🤖",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-white text-slate-900";
      case "current":
        return "bg-slate-200 text-slate-900";
      case "planned":
        return "bg-slate-600 text-white";
      default:
        return "bg-slate-600 text-white";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "current":
        return "Sedang Berjalan";
      case "planned":
        return "Rencana";
      default:
        return "Unknown";
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Roadmap Karir
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Perjalanan pengembangan skill dan karir dalam dunia teknologi yang
            terus berkembang
          </p>
        </motion.div>

        {/* Modern Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {roadmapData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Main Card */}
              <div className="relative bg-neutral-800/90 backdrop-blur-md rounded-xl p-8 border border-neutral-700 hover:border-neutral-600 transition-all duration-500 hover:shadow-2xl hover:shadow-neutral-900/50 group-hover:bg-neutral-800/80">
                {/* Status Badge */}
                <div className="absolute -top-4 left-8">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      item.status
                    )} shadow-lg`}
                  >
                    {getStatusText(item.status)}
                  </span>
                </div>

                {/* Icon & Year */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="text-4xl font-bold text-white">
                    {item.year}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-slate-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {item.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.15 + skillIndex * 0.1,
                      }}
                      className="bg-neutral-700/50 px-4 py-3 rounded-lg text-center border border-neutral-600 hover:border-neutral-500 transition-all duration-300 hover:bg-neutral-700/70"
                    >
                      <span className="text-gray-300 font-medium text-sm group-hover:text-gray-200 transition-colors duration-300">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="w-full bg-neutral-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width:
                          item.status === "completed"
                            ? "100%"
                            : item.status === "current"
                            ? "75%"
                            : "25%",
                      }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 rounded-full ${
                        item.status === "completed"
                          ? "bg-white"
                          : item.status === "current"
                          ? "bg-neutral-300"
                          : "bg-neutral-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent to-neutral-700/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Connection Line (for visual flow) */}
              {index < roadmapData.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-neutral-600 to-neutral-400 transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-neutral-800/90 to-neutral-700/90 backdrop-blur-md rounded-xl p-10 border border-neutral-700 max-w-4xl mx-auto">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Selalu Belajar & Berkembang
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Teknologi terus berkembang dengan cepat. Roadmap ini akan selalu
              diupdate sesuai dengan tren dan kebutuhan industri terbaru. Setiap
              langkah adalah pembelajaran yang berharga.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4</div>
                <div className="text-gray-400 text-sm">Tahap Perkembangan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">16+</div>
                <div className="text-gray-400 text-sm">
                  Skill yang Dipelajari
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-gray-400 text-sm">Potensi Pertumbuhan</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;
