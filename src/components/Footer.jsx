import React from "react";
import { ArrowUp, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-16 sm:py-24 lg:py-32 relative overflow-hidden rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Top Section - Call to Action and Contact Form */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 sm:mb-20 lg:mb-24">
          <div className="text-white mb-12 lg:mb-0">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display font-black mb-4 sm:mb-6 leading-none">
              Got a project?
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display font-black leading-none">
                Lets talk.
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-medium leading-none text-gray-300">
                Hi,
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-10 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="What's your name?"
                className="bg-transparent text-white text-lg sm:text-xl lg:text-2xl border-b-2 border-white pb-2 sm:pb-4 outline-none placeholder-gray-400 w-full sm:w-64 text-center font-body font-medium"
              />
            </div>
            <button className="px-8 sm:px-12 py-3 sm:py-5 border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-xl text-base sm:text-xl font-accent font-semibold w-full sm:w-auto">
              SUBMIT →
            </button>
          </div>
        </div>

        {/* Middle Section - Social Media, Navigation, and Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 mb-16 sm:mb-20 lg:mb-24">
          {/* Left Side - Social Media and Navigation */}
          <div>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-10 mb-12 sm:mb-16">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl">
                  B
                </span>
              </div>
              <a
                href="https://www.instagram.com/bagassdwipermanaa?igsh=MW10NHJqZDlmMGw3dw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer group"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-2 border-white rounded-lg flex items-center justify-center relative group-hover:border-black transition-colors duration-300">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full group-hover:bg-black transition-colors duration-300"></div>
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-white rounded-full group-hover:bg-black transition-colors duration-300"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full group-hover:bg-black transition-colors duration-300"></div>
                </div>
              </a>
              <a
                href="https://discord.com/users/syroooslwly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
              >
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a
                href="mailto:bagastelkomschool@gmail.com"
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="text-white text-base sm:text-lg lg:text-xl font-body">
              <div className="mb-3 sm:mb-4 flex flex-wrap gap-2 sm:gap-0">
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Home
                </span>
                <span className="hidden sm:inline mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  About Us
                </span>
                <span className="hidden sm:inline mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Projects
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-0">
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Services
                </span>
                <span className="hidden sm:inline mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Careers
                </span>
                <span className="hidden sm:inline mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Blogs
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="text-white">
            <div className="mb-8 sm:mb-10">
              <h3 className="font-accent font-medium text-gray-400 text-sm sm:text-base mb-2 sm:mb-4 uppercase tracking-wider">
                CONTACT US
              </h3>
              <p className="text-white text-base sm:text-lg lg:text-xl font-body">
                +62 859-6656-5357
              </p>
            </div>
            <div className="mb-8 sm:mb-10">
              <h3 className="font-accent font-medium text-gray-400 text-sm sm:text-base mb-2 sm:mb-4 uppercase tracking-wider">
                LOCATION
              </h3>
              <p className="text-white text-base sm:text-lg lg:text-xl font-body leading-relaxed">
                Jakarta, Indonesia
              </p>
            </div>
            <div>
              <h3 className="font-accent font-medium text-gray-400 text-sm sm:text-base mb-2 sm:mb-4 uppercase tracking-wider">
                EMAIL
              </h3>
              <p className="text-white text-base sm:text-lg lg:text-xl font-body">
                bagastelkomschool@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Scroll to Top */}
        <div className="flex items-center justify-between">
          <div className="text-white">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-none">
              Top
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="group relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 hover:border-white/80"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-500 group-hover:animate-spin"></div>

            {/* Arrow icon with hover animation */}
            <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white group-hover:text-white transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 relative z-10" />

            {/* Pulse effect on hover */}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
