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
  const isScrollingRef = useRef(false);
  const observerRef = useRef(null);

  const mobileRoles = [
    "Web Developer",
    "Cloud Engineer",
    "Software Engineer",
    "Full-Stack Developer",
    "UI/UX Designer",
  ];

  // Define section IDs for scroll detection
  const sectionIds = [
    "home",
    "about",
    "education",
    "projects",
    "certifications",
    "roadmap",
    "faq",
    "contact",
  ];

  // Mobile text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileTextIndex((prev) => (prev + 1) % mobileRoles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for section detection
  useEffect(() => {
    const setupObserver = () => {
      // Clean up existing observer
      if (observerRef.current) {
        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observerRef.current.unobserve(el);
        });
      }

      const options = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      };

      const handleIntersection = (entries) => {
        // Skip if we're programmatically scrolling
        if (isScrollingRef.current) return;

        // Find the section with highest intersection ratio
        let maxRatio = 0;
        let activeId = "home";

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeId = entry.target.id;
            }
          }
        });

        // Also check which section is closest to top
        const scrollY = window.scrollY;
        let closestSection = "home";
        let closestDistance = Infinity;

        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const distance = Math.abs(rect.top - 100); // 100px offset for navbar
            if (distance < closestDistance && rect.top <= 200 && rect.bottom >= 0) {
              closestDistance = distance;
              closestSection = id;
            }
          }
        });

        // Use the closest section if scroll is near top
        const finalSection = scrollY < 200 ? closestSection : activeId;

        setActiveSection((prev) => {
          if (prev !== finalSection) {
            if (import.meta.env.DEV) {
              console.log(`[Navbar] Active section: ${finalSection} (scroll: ${scrollY.toFixed(0)})`);
            }
            return finalSection;
          }
          return prev;
        });
      };

      observerRef.current = new IntersectionObserver(handleIntersection, options);

      // Observe all sections
      let found = 0;
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observerRef.current.observe(el);
          found++;
        } else {
          if (import.meta.env.DEV) {
            console.warn(`[Navbar] Section "${id}" not found`);
          }
        }
      });

      if (import.meta.env.DEV) {
        console.log(`[Navbar] Observer setup: ${found}/${sectionIds.length} sections`);
      }
    };

    // Setup with delay to ensure DOM is ready
    const timer = setTimeout(setupObserver, 200);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observerRef.current.unobserve(el);
        });
      }
    };
  }, []);

  // Scroll handler for progress bar and footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Footer detection
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setIsInFooter(footerTop <= window.innerHeight * 0.7);
      }

      // Force home at top
      if (scrollY < 50) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    console.log(`[Navbar] scrollToSection called: ${sectionId}`);
    
    const element = document.getElementById(sectionId);
    if (!element) {
      console.error(`[Navbar] Section "${sectionId}" not found!`);
      return;
    }

    // Set scrolling flag
    isScrollingRef.current = true;
    
    // Update active section immediately
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    // Method 1: Try scrollIntoView first
    try {
      // Temporarily add scroll-margin-top
      const originalMargin = element.style.scrollMarginTop;
      element.style.scrollMarginTop = '100px';
      
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Reset after scroll
      setTimeout(() => {
        element.style.scrollMarginTop = originalMargin;
      }, 1000);
    } catch (err) {
      console.warn('[Navbar] scrollIntoView failed, using window.scrollTo:', err);
      
      // Fallback: Calculate and scroll
      const navbarOffset = 100;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const targetY = Math.max(0, elementTop - navbarOffset);

      console.log(`[Navbar] Scrolling to "${sectionId}": ${targetY}px`);
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
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
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  // Hide navbar in footer
  if (isInFooter) {
    return null;
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-white via-white/80 to-white/40 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-2 sm:top-4 left-0 right-0 z-40 flex justify-center pointer-events-none"
      >
        {/* Desktop Navbar */}
        <div
          className={`hidden md:flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-300 pointer-events-auto ${
            isScrolled
              ? "bg-white/5 backdrop-blur-2xl border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]"
              : "bg-black/40 backdrop-blur-2xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
          }`}
          style={{
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
          }}
        >
          {/* Collapse button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCollapse}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label={isCollapsed ? "Expand" : "Collapse"}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          </motion.button>

          {/* Nav items */}
          <motion.div
            className="flex items-center gap-1 px-2 overflow-hidden pointer-events-auto"
            animate={{
              width: isCollapsed ? 0 : "auto",
              opacity: isCollapsed ? 0 : 1,
              pointerEvents: isCollapsed ? "none" : "auto",
            }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isCollapsed ? "none" : "auto" }}
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (import.meta.env.DEV) {
                    console.log(`[Navbar] Button clicked: ${item.id}`);
                  }
                  scrollToSection(item.id);
                }}
                className={`px-4 py-2 text-sm font-accent font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer relative z-20 ${
                  activeSection === item.id
                    ? "text-black bg-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
                style={{ pointerEvents: "auto" }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden w-full px-3 sm:px-4 pointer-events-auto">
          <div
            className={`flex items-center justify-between h-12 sm:h-14 rounded-full border px-4 sm:px-6 transition-all duration-300 ${
              isScrolled
                ? "bg-white/5 backdrop-blur-2xl border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]"
                : "bg-black/40 backdrop-blur-2xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
            }`}
            style={{
              background: isScrolled
                ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                : 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
            }}
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
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-xs text-gray-400 font-accent block"
                  >
                    {mobileRoles[mobileTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-1 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 sm:top-18 left-0 right-0 md:hidden bg-black/60 backdrop-blur-2xl border-t border-white/30 mx-3 sm:mx-4 rounded-b-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-auto"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
              }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToSection(item.id);
                    }}
                    className={`block px-4 py-3 text-base font-accent font-medium w-full text-left transition-all duration-300 rounded-lg cursor-pointer relative z-20 ${
                      activeSection === item.id
                        ? "text-black bg-white shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </button>
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
