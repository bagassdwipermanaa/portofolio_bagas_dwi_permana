import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://portofolio-backend.glitch.me/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast({
          title: "✅ Pesan berhasil dikirim!",
          description: "Terima kasih telah menghubungi saya.",
          variant: "default",
          duration: 5000,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "❌ Gagal mengirim pesan",
          description: result.message || "Terjadi kesalahan saat mengirim.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error saat mengirim:", error);
      toast({
        title: "⚠️ Error saat mengirim",
        description: "Cek koneksi ke server atau backend Anda.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact.bagasdp@gmail.com",
      href: "mailto:contact.bagasdp@gmail.com",
      color: "from-cyber-blue to-cyber-purple",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: "+62 859-6656-5357",
      href: "https://wa.me/6285966565357",
      color: "from-cyber-purple to-cyber-pink",
    },
    {
      icon: MapPin,
      label: "Lokasi",
      value: "Jakarta, Indonesia",
      href: "https://maps.app.goo.gl/FNuZafstA5ye1MAX9",
      color: "from-cyber-pink to-cyber-green",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/bagassdwipermana", // GitHub URL
      color: "hover:text-cyber-blue",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/bagassdwipermanaa?igsh=MW10NHJqZDlmMGw3dw%3D%3D&utm_source=qr", // Ganti '#' dengan URL Instagram-mu
      color: "hover:text-cyber-pink",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bagas-dwi-permana/", // Ganti '#' dengan URL LinkedIn-mu
      color: "hover:text-cyber-purple",
    },
  ];

  const handleSocialClick = (href, platform) => {
    if (href === "#") {
      toast({
        title: `🚧 ${platform} URL Not Set!`,
        description: `Please replace '#' with your ${platform} URL in the code.`,
        variant: "destructive",
        duration: 5000,
      });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="min-h-screen py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ scrollMarginTop: '100px' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">
              Contact Me
            </span>
          </h2>

          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-white to-neutral-300 mx-auto mb-6 sm:mb-8"></div>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-body max-w-3xl mx-auto">
            Let's work together to transform creative ideas into remarkable
            digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 sm:mb-6">
                Contact Information
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const isClickable = info.href !== "#";
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-xl hover:border-neutral-600 transition-all duration-300"
                    >
                      <div
                        className={`p-2 sm:p-3 bg-neutral-700/50 rounded-lg border border-neutral-600 flex-shrink-0`}
                      >
                        <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-neutral-400 text-xs sm:text-sm font-accent">
                          {info.label}
                        </p>
                        <a
                          href={info.href}
                          {...(isClickable
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {
                                onClick: (e) => {
                                  e.preventDefault();
                                  handleSocialClick(info.href, info.label);
                                },
                              })}
                          className="text-white font-body font-medium hover:text-neutral-300 transition-colors text-sm sm:text-base break-all"
                        >
                          {info.value}
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-heading font-bold text-white mb-3 sm:mb-4">
                Follow me
              </h4>

              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialClick(social.href, social.label)}
                    className={`p-2 sm:p-3 bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-xl text-neutral-300 ${social.color} transition-all duration-300 hover:border-neutral-600`}
                    aria-label={`Kunjungi ${social.label}`}
                  >
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-neutral-800/90 border border-neutral-700 rounded-xl p-4 sm:p-6 backdrop-blur-sm"
            >
              <p className="text-white font-accent font-semibold text-base sm:text-lg italic">
                "Each project is a chance to craft something exceptional. Let's
                collaborate to realize your digital vision."
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 sm:mb-6">
                Send message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-accent font-medium text-neutral-300 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg font-body text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-accent font-medium text-neutral-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg font-body text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors text-sm sm:text-base"
                    placeholder="name@gmail.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-accent font-medium text-neutral-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg font-body text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell us about a project or idea you'd like to bring to life..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neutral-700/50 hover:bg-neutral-600/50 border border-neutral-600 text-white py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-accent font-semibold group rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Send...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
