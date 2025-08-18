import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import DiagonalMarquee from "@/components/DiagonalMarquee";

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

  const handleDownloadCV = () => {
    const pdfUrl = "/cvbagasdwipermana.pdf";
    if (pdfUrl === "#") {
      toast({
        title: "🚧 URL PDF Belum Disetel!",
        description: "Harap ganti '#' dengan URL PDF CV Anda di kode.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      window.open(pdfUrl, "_blank");
      toast({
        title: "CV Sedang Diunduh...",
        description: "File CV akan segera terbuka di tab baru.",
        variant: "default",
        duration: 3000,
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      {/* Top diagonal strip - Tech Stack */}
      <DiagonalMarquee
        items={["REACT", "NODE.JS", "PYTHON", "JAVA", "AWS", "DOCKER"]}
        backgroundClass="bg-white"
        textClass="text-black font-semibold"
        dotClass="bg-black"
        rotate={25}
        className="top-[-8rem]"
        height="h-12"
        speedClass="marquee-fast"
      />

      {/* Middle diagonal strip - Skills */}
      <DiagonalMarquee
        items={["FRONTEND", "BACKEND", "DATABASE", "API", "CLOUD", "DEVOPS"]}
        backgroundClass="bg-neutral-800/90 border border-neutral-700"
        textClass="text-white font-semibold"
        dotClass="bg-white"
        rotate={-15}
        className="top-[-6rem]"
        height="h-10"
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
        textClass="text-white font-semibold"
        dotClass="bg-white"
        rotate={20}
        className="bottom-[-8rem]"
        height="h-12"
        speedClass="marquee-slow"
      />

      {/* Vertical side labels - Personal Identity */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-10 md:z-30 text-[10px] tracking-[0.3em] text-gray-400 font-medium">
        <div className="origin-left -rotate-90 mb-20 text-shadow-sm">
          SOFTWARE
        </div>
        <div className="origin-left -rotate-90 mb-20 text-shadow-sm">
          WEB DEV
        </div>
        <div className="origin-left -rotate-90 text-shadow-sm">CLOUD</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-30 w-full">
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-space font-bold leading-tight text-white heading-soft"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl">
              <span className="headline-sheen">Bagas</span>
              <span className="text-gray-400">.Dwi.</span>
              <span className="text-gray-500 headline-sheen">Permana</span>
            </span>
            <span className="block mt-4 text-5xl sm:text-6xl md:text-7xl">
              <span className="headline-sheen">
                Software Engineering Student
              </span>
            </span>
            <span className="block mt-4 text-5xl sm:text-6xl md:text-7xl">
              <span className="headline-sheen">& Full-Stack Developer</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              onClick={scrollToProjects}
              className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full"
            >
              View Projects <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded-full px-8 py-3"
            >
              Download CV <Download className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-gray-200 max-w-2xl body-soft"
          >
            <span className="font-space">{text}</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-gray-400"
            >
              _
            </motion.span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
