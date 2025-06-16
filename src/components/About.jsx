
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Heart } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Frontend Development', icon: Code, level: 90, color: 'from-cyber-blue to-cyber-purple' },
    { name: 'UI/UX Design', icon: Palette, level: 85, color: 'from-cyber-purple to-cyber-pink' },
    { name: 'Performance Optimization', icon: Zap, level: 80, color: 'from-cyber-pink to-cyber-blue' },
    { name: 'Problem Solving', icon: Heart, level: 95, color: 'from-cyber-blue to-cyber-green' },
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
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-space font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">
              About Me
            </span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto mb-8"
          ></motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-cyber-blue/30 rotate-45"
              ></motion.div>
              
              <p className="text-lg text-gray-300 leading-relaxed font-space">
  Hello! I'm <span className="text-cyber-blue font-semibold">Bagas Dwi Permana</span>, 
  a web developer passionate about crafting stunning and innovative digital experiences.
</p>
</div>

           <p className="text-gray-300 leading-relaxed font-space">
  With expertise in modern technologies like React, JavaScript, and the latest frameworks, I always strive to deliver solutions that are not only functional but also aesthetically pleasing and user-friendly.
</p>

            <p className="text-gray-300 leading-relaxed font-space">
  I believe every project is an opportunity to learn and grow. Creativity and technology are the two key elements that continually inspire me in every work I create.
</p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-cyber-blue font-space font-semibold">
                  "Code is poetry, and every line tells a story."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-space font-bold text-cyber-blue mb-6">
              Skills & Expertise
            </h3>

            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-lg">
                      <skill.icon className="h-5 w-5 text-cyber-blue" />
                    </div>
                    <span className="font-space font-medium text-gray-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-cyber-blue font-space font-semibold">
                    {skill.level}%
                  </span>
                </div>

                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
