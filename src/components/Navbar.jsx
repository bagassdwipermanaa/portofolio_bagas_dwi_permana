import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTextIndex, setMobileTextIndex] = useState(0);
  const [isInFooter, setIsInFooter] = useState(false);
  const tickingRef = useRef(false);

  const mobileRoles = [
    "Web Developer",
    "Cloud Engineer",
    "Software Engineer",
    "Full-Stack Developer",
    "UI/UX Designer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileTextIndex((prev) => (prev + 1) % mobileRoles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        const totalScrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          totalScrollable > 0 ? (window.scrollY / totalScrollable) * 100 : 0;
        setScrollProgress(progress);

        // Check if we're in footer section - improved detection
        const footerElement = document.querySelector("footer");
        if (footerElement) {
          const footerRect = footerElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Check if footer is more than 30% visible
          const isFooterVisible = footerRect.top <= windowHeight * 0.7;
          setIsInFooter(isFooterVisible);
        }

        // Improved section detection
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // If near very top, force active to home
        if (currentScrollY < 100) {
          setActiveSection("home");
        } else {
          // Find which section is currently in the center area of viewport
          let currentSection = "home";

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const sectionId = sectionIds[i];
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const sectionTop = rect.top;
              const sectionHeight = rect.height;

              // Check if this section is in the center area of viewport
              if (
                sectionTop <= windowHeight * 0.4 &&
                sectionTop + sectionHeight >= windowHeight * 0.4
              ) {
                currentSection = sectionId;
                break;
              }
            }
          }

          if (currentSection !== activeSection) {
            if (import.meta.env.DEV) {
              console.log(`Section changed to: ${currentSection}`);
            }
            setActiveSection(currentSection);
          }
        }

        tickingRef.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Define section IDs for scroll detection
  const sectionIds = [
    "home",
    "about",
    "education",
    "projects",
    "certifications",
    "roadmap",
    "playground",
    "faq",
    "contact",
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll to account for fixed navbar height
      const yOffset = 80; // px
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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

  // Don't render navbar if in footer
  if (isInFooter) {
    return null;
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-white via-white/80 to-white/40"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-2 sm:top-4 left-0 right-0 z-40 flex justify-center transition-all duration-300 ${
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
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`px-4 py-2 text-sm font-accent font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-black bg-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Mobile top bar */}
        <div className="md:hidden w-full px-3 sm:px-4">
          <div
            className={`flex items-center justify-between h-12 sm:h-14 rounded-full border px-4 sm:px-6 transition-all duration-300 ${
              isScrolled
                ? "bg-white/10 backdrop-blur-md border-white/20 shadow-[0_8px_30px_rgb(255,255,255,0.1)]"
                : "bg-black/90 backdrop-blur-md border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-display font-semibold text-white">
                Bagas
              </span>
              <div className="h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mobileTextIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="text-xs text-gray-400 font-accent block"
                  >
                    {mobileRoles[mobileTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="absolute top-16 sm:top-18 left-0 right-0 md:hidden bg-black/95 backdrop-blur-md border-t border-white/20 mx-3 sm:mx-4 rounded-b-2xl"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={
                      activeSection === item.id ? "page" : undefined
                    }
                    className={`block px-4 py-3 text-base font-accent font-medium w-full text-left transition-all duration-300 rounded-lg ${
                      activeSection === item.id
                        ? "text-black bg-white shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
