
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications'},
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-black/50 backdrop-blur-md border-t border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-space font-bold text-cyber-blue glitch-text" data-text="Bagas">
                  Bagas
                </span>
                <Code className="h-6 w-6 text-cyber-purple" />
              </div>
              
              <p className="text-gray-300 font-space leading-relaxed">
                A web developer passionate about creating stunning and innovative digital experiences using cutting-edge technology.
              </p>
              
              <div className="flex items-center space-x-2 text-cyber-pink">
                <span className="font-space text-sm">Made with</span>
                <Heart className="h-4 w-4 fill-current animate-pulse" />
                <span className="font-space text-sm">and lots of coffee</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <span className="text-lg font-space font-semibold text-cyber-purple">
                Quick Links
              </span>
              
              <nav className="flex flex-col space-y-2">
                {quickLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-cyber-blue font-space text-left transition-colors duration-300"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <span className="text-lg font-space font-semibold text-cyber-green">
                Get In Touch
              </span>
              
              <div className="space-y-2 text-gray-300 font-space">
                <p>bagastelkomschool@gmail.com</p>
                <p>+62 859-6656-5357</p>
                <p>Jakarta, Indonesia</p>
              </div>
              
              <Button
                onClick={() => scrollToSection('contact')}
                className="cyber-button mt-4"
              >
                Hubungi Saya
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 font-space text-sm text-center md:text-left"
            >
              © 2025 Bagas Dwi Permana. All rights reserved. Built with React & Tailwind CSS.
            </motion.p>

            {/* Back to Top Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="icon"
                className="cyber-button border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 group"
              >
                <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink"></div>
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-cyber-blue/20 rotate-45"
      />
    </footer>
  );
};

export default Footer;
