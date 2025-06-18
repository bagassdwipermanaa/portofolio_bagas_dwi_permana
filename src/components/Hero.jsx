import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ExternalLink, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Web Developer | Passionate about Tech & Creativity';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const pdfUrl = '/cvbagasdwipermana.pdf'; 
    if (pdfUrl === '#') {
      toast({
        title: "🚧 URL PDF Belum Disetel!",
        description: "Harap ganti '#' dengan URL PDF CV Anda di kode.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      window.open(pdfUrl, '_blank');
      toast({
        title: "CV Sedang Diunduh...",
        description: "File CV akan segera terbuka di tab baru.",
        variant: "default",
        duration: 3000,
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative mx-auto w-40 h-40 md:w-48 md:h-48 mb-6"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-blue/30 via-cyber-purple/30 to-slate-800 p-1 animate-glow-pulse">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img   
                  className="w-full h-full object-cover rounded-full hover:grayscale-0 transition-all duration-500" 
                  alt="Bagas Dwi Permana - Professional headshot of a web developer" src="IMG_2341.JPG" />
              </div>
            </div>
            <motion.div 
              className="absolute -bottom-2 -right-2 p-2 bg-slate-800 rounded-full shadow-lg border border-cyber-blue/30"
              animate={{ scale: [1, 1.1, 1]}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code className="w-6 h-6 text-cyber-blue" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-space font-bold mb-3 text-gray-100"
          >
            <span 
              className="relative"
              data-text="Bagas Dwi Permana"
            >
              Bagas Dwi Permana
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple"
                initial={{ width: 0 }}
                animate={{ width: "100%"}}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 mb-8 h-7 font-light"
          >
            <span className="font-space">{text}</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-cyber-blue/70"
            >
              _
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={scrollToProjects}
              className="cyber-button bg-cyber-blue/10 hover:bg-cyber-blue/20 border-cyber-blue text-cyber-blue px-8 py-3 text-md font-space font-medium group"
            >
              View My Projects
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="cyber-button border-gray-600 text-gray-400 hover:border-cyber-purple hover:text-cyber-purple hover:bg-cyber-purple/10 px-8 py-3 text-md font-space font-medium group"
            >
              Download CV
              <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-10"
          >
            {[
  'HTML5',
  'CSS3',
  'JavaScript ES6+',
  'React.js',
  'Node.js',
  'TailwindCSS',
  'PHP',
  'Python',
  'MySQL',
  'MongoDB',
  'Express.js',
  'Next.js',
  'Bootstrap',
  'TypeScript',
  'Git & GitHub',
  'Figma',
  'REST API',
  'Firebase'
]
.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.05, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.05, y: -3, color: '#00f5ff' }}
                className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/70 rounded-md text-xs font-space text-gray-400 backdrop-blur-sm cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, ease: "easeOut" }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-gray-500 hover:text-cyber-blue transition-colors cursor-pointer"
            onClick={scrollToProjects}
          >
            <span className="text-xs font-space mb-1">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;