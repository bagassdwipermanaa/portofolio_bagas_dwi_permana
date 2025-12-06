import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Apa saja teknologi yang kamu kuasai?",
      answer:
        "Saya menguasai berbagai teknologi termasuk HTML, CSS, JavaScript, React, Node.js, Java, C#, Python, dan SQL. Saya juga familiar dengan framework modern seperti Tailwind CSS dan tools development lainnya.",
      category: "Technical Skills",
    },
    {
      question: "Berapa lama pengalaman coding kamu?",
      answer:
        "Saya mulai belajar programming sejak 2022 dan telah mengembangkan beberapa project termasuk aplikasi desktop, web application, dan mobile app. Saya terus belajar dan mengembangkan skill secara konsisten.",
      category: "Experience",
    },
    {
      question: "Apa project terbaik yang pernah kamu buat?",
      answer:
        "Salah satu project terbaik saya adalah aplikasi eSport untuk SMK Telkom Jakarta yang mencakup UI/UX design dan development. Project ini menunjukkan kemampuan saya dalam full-stack development dan problem solving.",
      category: "Projects",
    },
    {
      question: "Bagaimana cara kamu belajar teknologi baru?",
      answer:
        "Saya belajar melalui berbagai sumber seperti dokumentasi resmi, tutorial online, project-based learning, dan praktik langsung. Saya juga aktif mengikuti perkembangan teknologi terbaru dan komunitas developer.",
      category: "Learning",
    },
    {
      question: "Apakah kamu open untuk freelance atau project collaboration?",
      answer:
        "Ya, saya sangat tertarik untuk berkolaborasi dalam project menarik dan freelance work. Saya senang bekerja dalam tim dan selalu terbuka untuk kesempatan baru yang menantang.",
      category: "Collaboration",
    },
    {
      question: "Apa rencana karir kamu ke depannya?",
      answer:
        "Saya berencana untuk terus mengembangkan skill dalam full-stack development, mempelajari teknologi AI/ML, dan berkontribusi dalam project yang memiliki impact positif. Tujuan jangka panjang adalah menjadi senior developer yang dapat mentoring developer junior.",
      category: "Career Goals",
    },
    {
      question: "Bagaimana kamu handle deadline dan pressure?",
      answer:
        "Saya menggunakan pendekatan systematic dengan time management yang baik, prioritas task, dan komunikasi yang jelas dengan stakeholder. Saya juga terbiasa bekerja dalam environment yang dinamis dan deadline yang ketat.",
      category: "Work Style",
    },
    {
      question: "Apa yang membuat kamu berbeda dari developer lain?",
      answer:
        "Saya memiliki kombinasi unik antara technical skills, creative thinking, dan passion untuk learning. Saya selalu mencari cara untuk optimize code, improve user experience, dan implement best practices dalam setiap project.",
      category: "Personal Brand",
    },
  ];

  const categories = [...new Set(faqData.map((item) => item.category))];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Pertanyaan yang sering ditanyakan tentang skill, pengalaman, dan
            karir saya
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="px-6 py-3 bg-neutral-800/90 backdrop-blur-md rounded-full border border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {category}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800/90 backdrop-blur-md rounded-xl border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-slate-300 text-lg font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.question}
                    </h3>
                    <span className="text-sm text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full border border-slate-600/50">
                      {item.category}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-300 text-xl"
                >
                  ▼
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="border-l-4 border-slate-400/30 pl-4">
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-lg p-8 border border-slate-600/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Masih ada pertanyaan?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Jika ada pertanyaan lain yang belum terjawab, jangan ragu untuk
              menghubungi saya langsung. Saya akan dengan senang hati membantu
              dan menjawab semua pertanyaan Anda.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors duration-200 hover:shadow-lg hover:shadow-slate-600/25"
            >
              <span>Hubungi Saya</span>
              <span>→</span>
            </a>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-300 mb-2">
              {faqData.length}+
            </div>
            <div className="text-gray-400 text-sm">FAQ Answered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-300 mb-2">
              {categories.length}
            </div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400 text-sm">Transparency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-200 mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
