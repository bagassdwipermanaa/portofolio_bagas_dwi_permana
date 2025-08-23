import React from "react";
import { ArrowUp, Globe, Twitter, Instagram } from "lucide-react";

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
                  B&
                </span>
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl">
                  X
                </span>
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-2 border-white rounded-lg flex items-center justify-center relative">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full"></div>
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-white rounded-full"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full"></div>
                </div>
              </div>
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
