import React, { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp, Code, Rocket, Brain, Cloud, Sparkles } from "lucide-react";

// Move roadmapData outside component to prevent recreation on every render
const roadmapData = [
    {
      year: "2023",
      title: "Memulai Perjalanan Coding",
      shortDescription: "Awal mula belajar programming dan web development",
      fullDescription: "Di tahun 2023, saya memulai perjalanan coding dengan mempelajari dasar-dasar programming. Fokus utama pada HTML, CSS, dan JavaScript untuk memahami fundamental web development. Mulai membuat project sederhana dan belajar konsep-konsep penting seperti DOM manipulation, event handling, dan responsive design.",
      skills: ["HTML5", "CSS3", "JavaScript", "Git", "VS Code"],
      achievements: [
        "Membuat website portfolio pertama",
        "Belajar responsive design",
        "Memahami dasar-dasar JavaScript ES6+",
      ],
      status: "completed",
      icon: Code,
    },
    {
      year: "2024",
      title: "Frontend & Framework Modern",
      shortDescription: "Menguasai React dan framework modern lainnya",
      fullDescription: "Tahun 2024 adalah fase pengembangan skill frontend yang lebih advanced. Fokus pada React, state management, dan modern CSS frameworks. Belajar component-based architecture, hooks, context API, dan routing. Juga mulai eksplorasi dengan Tailwind CSS untuk styling yang lebih efisien dan modern.",
      skills: ["React", "Tailwind CSS", "Vite", "React Router", "Context API"],
      achievements: [
        "Membangun aplikasi React yang kompleks",
        "Menguasai Tailwind CSS untuk rapid development",
        "Memahami state management patterns",
      ],
      status: "current",
      icon: Rocket,
    },
    {
      year: "2025",
      title: "Full Stack Development",
      shortDescription: "Ekspansi ke backend dan database",
      fullDescription: "Tahun 2025 fokus pada full stack development. Belajar Node.js, Express.js, dan database management (MongoDB, PostgreSQL). Memahami RESTful API, authentication, dan server-side rendering. Juga mulai belajar tentang deployment dan DevOps basics.",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST API"],
      achievements: [
        "Membangun full stack application",
        "Memahami database design dan optimization",
        "Deploy aplikasi ke production",
      ],
      status: "planned",
      icon: Brain,
    },
    {
      year: "2026+",
      title: "Advanced Technologies",
      shortDescription: "AI, Cloud Computing, dan teknologi masa depan",
      fullDescription: "Visi jangka panjang untuk menguasai teknologi advanced seperti AI/ML, cloud computing (AWS, Azure), containerization (Docker, Kubernetes), dan microservices architecture. Fokus pada scalability, performance optimization, dan best practices dalam software engineering.",
      skills: ["AI/ML", "AWS", "Docker", "Kubernetes", "Microservices"],
      achievements: [
        "Implementasi AI dalam aplikasi",
        "Cloud infrastructure management",
        "System architecture design",
      ],
      status: "planned",
      icon: Cloud,
    },
];

const Roadmap = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-white/10",
          border: "border-white/40",
          text: "text-white",
          badge: "bg-white text-black border-white/50",
          progress: "from-white to-neutral-200",
          glow: "rgba(255, 255, 255, 0.3)",
        };
      case "current":
        return {
          bg: "bg-white/5",
          border: "border-white/30",
          text: "text-white",
          badge: "bg-white/20 text-white border-white/40",
          progress: "from-white/80 to-white/60",
          glow: "rgba(255, 255, 255, 0.2)",
        };
      case "planned":
        return {
          bg: "bg-neutral-800/50",
          border: "border-neutral-700/50",
          text: "text-neutral-400",
          badge: "bg-neutral-800/50 text-neutral-400 border-neutral-700/50",
          progress: "from-neutral-600 to-neutral-700",
          glow: "rgba(255, 255, 255, 0.1)",
        };
      default:
        return {
          bg: "bg-neutral-800/50",
          border: "border-neutral-700/50",
          text: "text-neutral-400",
          badge: "bg-neutral-800/50 text-neutral-400 border-neutral-700/50",
          progress: "from-neutral-600 to-neutral-700",
          glow: "rgba(255, 255, 255, 0.1)",
        };
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

  const toggleExpand = useCallback((index) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  }, []);

  // Create stable toggle handlers for each card
  const toggleHandlers = useMemo(() => {
    return roadmapData.map((_, index) => () => toggleExpand(index));
  }, [toggleExpand]);

  // 3D Card Component - Simplified without mouse tracking to prevent re-renders
  const Card3D = memo(({ item, index, isExpanded, onToggle }) => {
    const shouldReduceMotion = useReducedMotion();
    const statusColors = useMemo(() => getStatusColor(item.status), [item.status]);
    const Icon = item.icon;

    // Use CSS variables for hover effects instead of direct style manipulation
    const cardStyle = useMemo(() => ({
      '--border-color': statusColors.border,
      '--glow-color': statusColors.glow,
      borderColor: statusColors.border,
      boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px ${statusColors.border}`,
      transform: "translateZ(20px)",
    }), [statusColors.border, statusColors.glow]);

    return (
      <div
        className="relative group roadmap-card-entrance"
        style={{ animationDelay: `${index * 0.15}s`, paddingTop: '12px' }}
      >
        {/* 3D Card Container */}
        <div
          className="roadmap-card-3d transition-transform duration-300 ease-out"
        >
          {/* Main Card */}
          <div
            className={`relative backdrop-blur-xl rounded-3xl p-8 pt-16 border-2 overflow-visible h-full transition-shadow duration-300 roadmap-card-hover ${statusColors.bg}`}
            style={cardStyle}
          >
            {/* Animated Gradient Background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            />

            {/* Glow Effect */}
            <div
              className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))`,
                filter: `blur(40px)`,
              }}
            />

            {/* Spotlight Effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(500px circle at 50% 50%, rgba(255,255,255,0.2), transparent 50%)",
              }}
            />

            {/* Status Badge - 3D Floating */}
            <div
              className="absolute top-2 left-4 z-30"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-xl ${statusColors.badge} shadow-xl whitespace-nowrap`}
                style={{
                  boxShadow: `0 8px 20px ${statusColors.glow}, 0 0 0 1px ${statusColors.border}`,
                }}
              >
                {getStatusText(item.status)}
              </div>
            </div>

            {/* Year Badge - 3D Floating */}
            <div
              className="absolute top-2 right-4 z-30"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              <div
                className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white text-xs font-bold shadow-xl whitespace-nowrap"
                style={{
                  boxShadow: "0 8px 20px rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.2)",
                }}
              >
                {item.year}
              </div>
            </div>

            {/* Icon & Title Section */}
            <div className="flex items-start gap-5 mb-6 mt-8 relative z-10">
              <div
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden transition-transform duration-300 hover:scale-110"
                style={{
                  transform: "translateZ(50px)",
                }}
              >
                {/* Icon Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2), transparent)`,
                  }}
                />
                <Icon className="h-8 w-8 text-white relative z-10" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  {item.shortDescription}
                </p>
              </div>
            </div>

            {/* Skills Grid - 3D Layered */}
            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
              {item.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="bg-neutral-800/60 backdrop-blur-sm px-4 py-3 rounded-xl text-center border border-neutral-700/50 hover:border-white/30 transition-all duration-300 relative overflow-hidden group/skill"
                  style={{
                    transform: "translateZ(30px)",
                  }}
                >
                  {/* Skill Glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle, rgba(255,255,255,0.15), transparent)`,
                    }}
                  />
                  <span className="text-gray-300 font-medium text-sm relative z-10">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Expand Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="w-full flex items-center justify-center gap-2 text-gray-400 group-hover:text-white transition-colors relative z-10 py-2 hover:bg-white/5 rounded-lg"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">
                {isExpanded ? "Tutup Detail" : "Baca Lebih Lengkap"}
              </span>
            </button>

            {/* Expanded Content - 3D */}
            <div
              className="relative z-10 overflow-hidden transition-all duration-400 ease-in-out"
              style={{
                transform: "translateZ(40px)",
                transformStyle: "preserve-3d",
                maxHeight: isExpanded ? "2000px" : "0px",
                opacity: isExpanded ? 1 : 0,
                marginTop: isExpanded ? 20 : 0,
                paddingTop: isExpanded ? 20 : 0,
                borderTop: isExpanded ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.4s ease-in-out, padding-top 0.4s ease-in-out",
              }}
            >
                  {/* Full Description */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-white" />
                      <h4 className="text-lg font-semibold text-white">
                        Deskripsi Lengkap
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {item.fullDescription}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-white" />
                      <h4 className="text-lg font-semibold text-white">
                        Pencapaian
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {item.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="text-white text-lg mt-0.5">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span
                        className={`text-sm font-bold ${statusColors.text}`}
                      >
                        {item.status === "completed"
                          ? "100%"
                          : item.status === "current"
                          ? "75%"
                          : "0%"}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800/50 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            item.status === "completed"
                              ? "100%"
                              : item.status === "current"
                              ? "75%"
                              : "0%",
                        }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-3 rounded-full bg-gradient-to-r ${statusColors.progress}`}
                        style={{
                          boxShadow: `0 0 20px ${statusColors.glow}`,
                        }}
                      />
                    </div>
                  </div>
            </div>

            {/* 3D Depth Lines */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        {/* Connection Line */}
        {index < roadmapData.length - 1 && (
          <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-1 bg-gradient-to-r from-white/30 via-white/20 to-transparent transform -translate-y-1/2 z-0" />
        )}
      </div>
    );
  }, (prevProps, nextProps) => {
    // Custom comparison for memo - prevent unnecessary re-renders
    // But allow re-render when isExpanded changes
    if (prevProps.isExpanded !== nextProps.isExpanded) {
      return false; // Allow re-render when expansion state changes
    }
    return (
      prevProps.item.year === nextProps.item.year &&
      prevProps.index === nextProps.index &&
      prevProps.onToggle === nextProps.onToggle
    );
  });

  return (
    <section
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-visible"
      style={{ scrollMarginTop: "100px" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Roadmap Karir
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Perjalanan pengembangan skill dan karir dalam dunia teknologi yang
            terus berkembang
          </p>
        </div>

        {/* 3D Roadmap Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {roadmapData.map((item, index) => (
            <Card3D
              key={item.year}
              item={item}
              index={index}
              isExpanded={expandedCard === index}
              onToggle={toggleHandlers[index]}
            />
          ))}
        </div>

        {/* Bottom Info Section */}
        <div
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-neutral-800/90 to-neutral-700/90 backdrop-blur-xl rounded-3xl p-10 border border-white/10 max-w-4xl mx-auto shadow-2xl">
            <div
              className="text-6xl mb-6 roadmap-emoji-animation"
            >
              📚
            </div>
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
              {[
                { value: "4", label: "Tahap Perkembangan" },
                { value: "20+", label: "Skill yang Dipelajari" },
                { value: "∞", label: "Potensi Pertumbuhan" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Roadmap);
