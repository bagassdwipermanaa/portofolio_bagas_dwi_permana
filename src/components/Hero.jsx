import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import DiagonalMarquee from "@/components/DiagonalMarquee";
import TechMarquee from "@/components/TechMarquee";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText =
    "Software Engineering Student | Web Developer | Cloud Engineer";

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
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    const pdfUrl = "/cvbagasdwipermana.pdf";
    if (pdfUrl === "#") {
      toast({
        title: "🚧 PDF URL Not Set!",
        description: "Please replace '#' with your CV PDF URL in the code.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      toast({
        title: "CV Downloading...",
        description: "CV file will open in a new tab shortly.",
        variant: "default",
        duration: 3000,
      });
    }
  };

  return (
    <section className="h-screen flex items-center relative overflow-hidden pt-12 sm:pt-16 pb-2 sm:pb-4" style={{ scrollMarginTop: '0px' }}>
      {/* Top diagonal strip - Tech Stack */}
      <DiagonalMarquee
        items={["REACT", "NODE.JS", "PYTHON", "JAVA", "AWS", "DOCKER"]}
        backgroundClass="bg-white"
        textClass="text-black font-accent font-semibold"
        dotClass="bg-black"
        rotate={25}
        className="top-10 sm:top-[-12rem] hidden sm:block"
        height="h-8 sm:h-12"
        speedClass="marquee-fast"
      />

      {/* Middle diagonal strip - Skills */}
      <DiagonalMarquee
        items={["FRONTEND", "BACKEND", "DATABASE", "API", "CLOUD", "DEVOPS"]}
        backgroundClass="bg-neutral-800/90 border border-neutral-700"
        textClass="text-white font-accent font-semibold"
        dotClass="bg-white"
        rotate={-15}
        className="top-28 sm:top-[-10rem] hidden sm:block"
        height="h-6 sm:h-10"
        speedClass="marquee-medium"
      />

      {/* Bottom diagonal strip - Personal Brand */}
      <DiagonalMarquee
        items={[
          "INNOVATION",
          "CREATIVITY",
          "PROBLEM SOLVING",
          "TEAMWORK",
          "LEARNING",
        ]}
        backgroundClass="bg-neutral-900/90 border border-neutral-800"
        textClass="text-white font-accent font-semibold"
        dotClass="bg-white"
        rotate={20}
        className="bottom-10 sm:bottom-[-14rem] hidden sm:block"
        height="h-8 sm:h-12"
        speedClass="marquee-slow"
      />

      {/* Vertical side labels - Personal Identity */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-10 md:z-30 text-[10px] tracking-[0.3em] text-gray-400 font-accent font-medium">
        <div className="origin-left -rotate-90 mb-20 text-shadow-sm">
          SOFTWARE
        </div>
        <div className="origin-left -rotate-90 mb-20 text-shadow-sm">
          WEB DEV
        </div>
        <div className="origin-left -rotate-90 text-shadow-sm">CLOUD</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-30 w-full h-full flex flex-col justify-center py-4">
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold leading-tight text-white heading-soft"
            role="heading"
            aria-level="1"
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl">
              <span className="headline-sheen">Bagas</span>
              <span className="text-gray-400">.Dwi.</span>
              <span className="text-gray-500 headline-sheen">Permana</span>
            </span>
            <span className="block mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              <span className="headline-sheen">
                Software Engineering Student
              </span>
            </span>
            <span className="block mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              <span className="headline-sheen">& Full-Stack Developer</span>
            </span>
          </motion.h1>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 sm:mt-4"
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-200 text-xs sm:text-sm font-body">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for freelance/internship
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={scrollToProjects}
                className="group bg-white text-black hover:bg-white/90 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-accent font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-white/50 relative overflow-hidden"
                aria-label="View my projects portfolio"
              >
                <span className="relative z-10 flex items-center">
                  View Projects{" "}
                  <motion.span
                    className="ml-2"
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ExternalLink
                      className="h-3 w-3 sm:h-4 sm:w-4 inline-block"
                      aria-hidden="true"
                    />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={handleDownloadCV}
                variant="outline"
                className="group border-2 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-500 hover:text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-accent font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] relative overflow-hidden"
                aria-label="Download my CV in PDF format"
              >
                <span className="relative z-10 flex items-center">
                  Download CV{" "}
                  <motion.span
                    className="ml-2"
                    whileHover={{ y: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Download
                      className="h-3 w-3 sm:h-4 sm:w-4 inline-block"
                      aria-hidden="true"
                    />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-white to-white/80 text-black hover:from-white hover:to-white/90 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-accent font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:shadow-white/60 relative overflow-hidden"
                aria-label="Contact me for hiring opportunities"
              >
                <span className="relative z-10">Hire Me</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "linear",
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 sm:mt-4 text-gray-200 max-w-2xl body-soft font-body text-xs sm:text-sm"
          >
            <span className="font-body">{text}</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-gray-400"
            >
              _
            </motion.span>
          </motion.p>

          {/* Tech marquee dengan logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 sm:mt-5 relative"
          >
            <div className="relative overflow-hidden mask-fade-x">
              <TechMarquee />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
