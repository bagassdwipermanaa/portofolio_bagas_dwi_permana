
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  const educationData = [
  {
    id: 1,
    degree: 'Software Engineering',
    institution: 'SMK Telkom Jakarta',
    period: '2023 - 2026',
    location: 'Jakarta, Indonesia',
    description: 'Focused on web application development and database management. Actively involved in e-sports extracurricular activities and technology competitions.',
    achievements: [
      'E-Sports - 1st Place (Gold) at Eufhoghia 2024 — Mobile Legends competition organized by SMA Pesantren Unggul Al Bayan',
      'E-Sports - 1st Place (Gold) in Mobile Legends at the Jakarta Entrepreneur Indoor Bazaar, organized by the West Jakarta City Administration Office of Industry, Trade, Cooperatives, and SMEs'
    ],
    color: 'from-cyber-blue to-cyber-purple'
  },
  {
    id: 2,
    degree: 'Junior High School',
    institution: 'SMP Negeri 82 Jakarta',
    period: '2020 - 2023',
    location: 'Jakarta, Indonesia',
    description: 'Built a strong foundation in general education while showing a deep interest in technology and the digital world. Actively participated in extracurricular activities, especially in e-sports.',
    achievements: [
      '3rd Place in Mobile Legends at the 2022 DKI Jakarta Province Student E-Sports Championship II'
    ],
    color: 'from-cyber-purple to-cyber-pink'
  }
];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink">
              Education
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-300 font-space max-w-3xl mx-auto">
            The academic journey and learning that formed the foundation of my expertise
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 timeline-line"></div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="space-y-12"
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 timeline-dot rounded-full z-10"></div>

                {/* Content card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                    }}
                    className="bg-black/30 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:border-cyber-blue/50 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 bg-gradient-to-r ${edu.color} rounded-lg`}>
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-space font-bold text-white mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-cyber-blue font-space font-semibold">
                            {edu.institution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 font-space leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-cyber-blue">
                        <Award className="h-4 w-4" />
                        <span className="font-space font-semibold">Achievments:</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-300 text-sm font-space">
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: 'Class 11', label: 'Grade (Software Engineering)', color: 'from-cyber-blue to-cyber-purple' },
            { value: '7 Certif', label: 'Certifications (Tech & Soft Skills)', color: 'from-cyber-purple to-cyber-pink' },
            { value: '5 Projects', label: 'Projects (Personal & School)', color: 'from-cyber-pink to-cyber-green' },
            { value: '18 Tech', label: 'Technologies (Languages, Frameworks, Tools)', color: 'from-cyber-green to-cyber-blue' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-black/30 backdrop-blur-md border border-gray-700 rounded-xl hover:border-cyber-blue/50 transition-all duration-300"
            >
              <div className={`text-3xl md:text-4xl font-space font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 font-space text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
