import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Star,
  Trophy,
  BookOpen,
  Users,
} from "lucide-react";

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "Software Engineering",
      institution: "SMK Telkom Jakarta",
      period: "2023 - 2026",
      location: "Jakarta, Indonesia",
      description:
        "Focused on web application development and database management. Actively involved in e-sports extracurricular activities and technology competitions.",
      achievements: [
        "E-Sports - 1st Place (Gold) at Eufhoghia 2024 — Mobile Legends competition organized by SMA Pesantren Unggul Al Bayan",
        "E-Sports - 1st Place (Gold) in Mobile Legends at the Jakarta Entrepreneur Indoor Bazaar, organized by the West Jakarta City Administration Office of Industry, Trade, Cooperatives, and SMEs",
      ],
      icon: <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />,
      gradient: "from-white to-neutral-300",
      bgGradient: "from-white/20 to-neutral-300/20",
    },
    {
      id: 2,
      degree: "Junior High School",
      institution: "SMP Negeri 82 Jakarta",
      period: "2020 - 2023",
      location: "Jakarta, Indonesia",
      description:
        "Built a strong foundation in general education while showing a deep interest in technology and the digital world. Actively participated in extracurricular activities, especially in e-sports.",
      achievements: [
        "3rd Place in Mobile Legends at the 2022 DKI Jakarta Province Student E-Sports Championship II",
      ],
      icon: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />,
      gradient: "from-neutral-300 to-white",
      bgGradient: "from-neutral-300/20 to-white/20",
    },
  ];

  const stats = [
    {
      icon: <Star className="h-5 w-5 sm:h-6 sm:w-6" />,
      value: "Class 11",
      label: "Grade (Software Engineering)",
      gradient: "from-white to-neutral-300",
    },
    {
      icon: <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />,
      value: "7 Certif",
      label: "Certifications (Tech & Soft Skills)",
      gradient: "from-neutral-300 to-white",
    },
    {
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />,
      value: "5 Projects",
      label: "Projects (Personal & School)",
      gradient: "from-white to-neutral-300",
    },
    {
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
      value: "18 Tech",
      label: "Technologies (Languages, Frameworks, Tools)",
      gradient: "from-neutral-300 to-white",
    },
  ];

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">{/* Removed blur circles */}</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-white to-neutral-300 rounded-full mb-4 sm:mb-6"
          >
            <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-background" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
            Education Journey
          </h2>

          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-white via-neutral-300 to-white mx-auto mb-6 sm:mb-8 rounded-full"></div>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The academic foundation that shaped my expertise in technology and
            innovation
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-12 sm:space-y-16 mb-16 sm:mb-20 lg:mb-24"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Connection Line */}
              {/* Removed connection line */}

              <div className="relative">
                {/* Timeline Dot */}
                {/* Removed timeline dot */}

                {/* Content Card */}
                <div className="relative ml-4 sm:ml-8 md:ml-0 md:flex md:justify-center">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                    }}
                    className="w-full max-w-4xl bg-neutral-800/90 backdrop-blur-xl border border-neutral-700 rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-neutral-600 transition-all duration-500 shadow-2xl"
                  >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 md:mb-0">
                        <div className="p-3 sm:p-4 rounded-2xl bg-neutral-700/50 border border-neutral-600">
                          <div className="text-white">{edu.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                            {edu.degree}
                          </h3>
                          <p className="text-base sm:text-lg text-white font-semibold">
                            {edu.institution}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end space-y-1 sm:space-y-2">
                        <div className="flex items-center space-x-2 text-white">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold text-sm sm:text-base">
                            {edu.period}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-white">
                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold text-sm sm:text-base">
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8">
                      <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                        {edu.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 text-white mb-3 sm:mb-4">
                        <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="text-lg sm:text-xl font-bold text-white">
                          Achievements
                        </span>
                      </div>
                      <div className="grid gap-2 sm:gap-3">
                        {edu.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-neutral-700/50 rounded-xl border border-neutral-600"
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
                              {achievement}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -5,
              }}
              className="group relative text-center p-4 sm:p-6 lg:p-8 bg-neutral-800/90 backdrop-blur-xl border border-neutral-700 rounded-2xl hover:border-neutral-600 transition-all duration-500 shadow-xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-700/20 to-neutral-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className="relative z-10 mb-3 sm:mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-neutral-700/50 rounded-2xl border border-neutral-600 mb-3 sm:mb-4">
                  <div className="text-white">{stat.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
