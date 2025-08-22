import React from "react";
import { ArrowUp, Globe, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-32 relative overflow-hidden rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 relative z-10">
        {/* Top Section - Call to Action and Contact Form */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-24">
          <div className="text-white mb-16 lg:mb-0">
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-display font-black mb-6 leading-none">
              Got a project?
            </h2>
            <div className="flex items-baseline gap-6">
              <span className="text-7xl md:text-8xl lg:text-9xl font-display font-black leading-none">
                Lets talk.
              </span>
              <span className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-none text-gray-300">
                Hi,
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-10">
            <div className="relative">
              <input
                type="text"
                placeholder="What's your name?"
                className="bg-transparent text-white text-2xl border-b-2 border-white pb-4 outline-none placeholder-gray-400 w-64 text-center font-body font-medium"
              />
            </div>
            <button className="px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-xl text-xl font-accent font-semibold">
              SUBMIT →
            </button>
          </div>
        </div>

        {/* Middle Section - Social Media, Navigation, and Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Left Side - Social Media and Navigation */}
          <div>
            {/* Social Media Icons */}
            <div className="flex items-center gap-10 mb-16">
              <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <span className="font-display font-bold text-2xl">B&</span>
              </div>
              <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <Globe className="w-8 h-8" />
              </div>
              <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <span className="font-display font-bold text-2xl">X</span>
              </div>
              <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center relative">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="text-white text-xl font-body">
              <div className="mb-4">
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Home
                </span>
                <span className="mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  About Us
                </span>
                <span className="mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Projects
                </span>
              </div>
              <div>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Services
                </span>
                <span className="mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Careers
                </span>
                <span className="mx-6">/</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">
                  Blogs
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="text-white">
            <div className="mb-10">
              <h3 className="font-accent font-medium text-gray-400 text-base mb-4 uppercase tracking-wider">
                CONTACT US
              </h3>
              <p className="text-white text-xl font-body">+1891989-11-91</p>
            </div>
            <div className="mb-10">
              <h3 className="font-accent font-medium text-gray-400 text-base mb-4 uppercase tracking-wider">
                LOCATION
              </h3>
              <p className="text-white text-xl font-body leading-relaxed">
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
            </div>
            <div>
              <h3 className="font-accent font-medium text-gray-400 text-base mb-4 uppercase tracking-wider">
                EMAIL
              </h3>
              <p className="text-white text-xl font-body">hello@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Scroll to Top */}
        <div className="flex items-center justify-between">
          <div className="text-white">
            <span className="text-7xl md:text-8xl font-display font-black leading-none">
              Top
            </span>
          </div>
          <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center">
            <ArrowUp className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
