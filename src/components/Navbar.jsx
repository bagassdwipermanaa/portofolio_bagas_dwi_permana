import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "roadmap", label: "Roadmap" },
    { id: "playground", label: "Playground" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-4 left-0 right-0 z-40 flex justify-center transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "" : ""
      }`}
    >
      {/* Desktop capsule navbar */}
      <div
        className={`hidden md:flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-md border-white/20 shadow-[0_8px_30px_rgb(255,255,255,0.1)]"
            : "bg-black/90 backdrop-blur-md border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
        }`}
      >
        {/* Collapse/Expand toggle button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCollapse}
          className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label={isCollapsed ? "Expand navbar" : "Collapse navbar"}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
        </motion.button>

        {/* Links */}
        <motion.div
          className="flex items-center gap-1 px-2 overflow-hidden"
          animate={{
            width: isCollapsed ? 0 : "auto",
            opacity: isCollapsed ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden w-full px-4">
        <div className="flex items-center justify-between h-12 rounded-full bg-black/90 backdrop-blur-md border border-white/10 px-4">
          <span className="text-lg font-space font-semibold text-white">
            bagas
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-cyber-blue p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 md:hidden bg-black/95 backdrop-blur-md border-t border-cyber-blue/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-cyber-blue block px-4 py-2 text-base font-medium w-full text-left transition-colors duration-300"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
